import requests
import mysql.connector
import pandas as pd
import random
import json
import numpy as np
import string
from geo_data_handling import googleAPIFarmersMarkets, googleAPILocation, googleAPINonProfit
from bs4 import BeautifulSoup
from california_counties import california_counties

FM_THRESHOLD = 3
CH_THRESHOLD = 3





'''
Each model has a function to do each of the following
1. Create SQL table
2. Fetch API calls, engineer data according and convert to json
3. Send relevant info with mySQL
'''

# MySQL database connection details, utilized to create tables and insert data 
db_config = {
    "host": "database-1.cnowuhjix5ja.us-west-1.rds.amazonaws.com",
    "user": "admin",
    "password": "Central_Valley1",
    "database": "api_scraping",
}

#------------------------------------------------------------------------

# CROP LOCATION DATA
complete_location_data = {}

# Crop Location table
def create_location_table():
    # The SQL query to create a new table
    create_table_query = """
        CREATE TABLE IF NOT EXISTS final_location_data (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            est INT,
            area VARCHAR(255),
            county_seat VARCHAR(255),
            map VARCHAR(255),
            population INT,
            crops JSON,
            crops_str VARCHAR(255),
            closest_farmers_markets JSON,
            closest_charities JSON,
            photo_references JSON
        );
    """

    try:
        # Establish a database connection
        connection = mysql.connector.connect(**db_config)
        # Create a cursor object to interact with the database
        cursor = connection.cursor()
        # Execute the CREATE TABLE query
        cursor.execute(create_table_query)
        print("location_table created successfully.")

    except mysql.connector.Error as err:
        print("Error creating the table:", err)

    finally:
        # Close the cursor and connection
        cursor.close()
        connection.close()

def fetch_location_crop_data():

    url = "https://quickstats.nass.usda.gov/api/api_GET/?key=2937E8A6-338E-3BD9-8E2E-1EF47FF8D729&sector_desc=crops&year=2018&state_alpha=CA&group_desc=VEGETABLES"

    payload = "2937E8A6-338E-3BD9-8E2E-1EF47FF8D729\n"
    headers = {
    'Content-Type': 'text/plain',
    'Cookie': 'quickstats_session=afebe89f705418a2752aecbfb32b53b21c3a43c4'
    }
    
    # Execute query
    try: 
        response = requests.request("GET", url, headers=headers, data=payload)
        if response.status_code == 200:
            res = response.json()
        else:
            print(f"Failed to fetch data from nass.usda API. Status Code: {response.status_code}")
            return None
    
    except Exception as excep:
        print(f"Error fetching data from API: {str(excep)}")
        return None


    # Using function from geo_data_handling module, we Update the JSON to add more
    # information about each county
    googleAPILocation(res['data'])
    
    # External API call to get initial county data to supplement data
    complete_location_data = get_county_data()

    # Time to combine JSON and initial county data: iterate through each JSON object
    for obj in res['data']:
        # Format to match county name in dictionary
        formatted_loc_name = string.capwords(obj['county_name'])
        # Check if the county name exists (only for keeping out 'Other Counties')
        if formatted_loc_name in complete_location_data:
            # Get the county data for this county
            county_data = complete_location_data[formatted_loc_name]
            # Have we come across this county before in the JSON(no crops field
            # or photo_references field)?
            if 'crops' not in county_data:
                # NOPE! Create a set and also create a photo_references field
                county_data['crops'] = set()
                county_data['photo_references'] = obj['photo_references']
            # Add the crop to the crops' county data field
            county_data['crops'].add(obj['commodity_desc'])

    # Create a string format for crops data
    for county in complete_location_data.values():
        county['crops_str'] = ';'.join(list(county['crops']))
    
    # add relational data from two other models: farmers market and charities.
    add_relational_data_to_locations(complete_location_data)

    return complete_location_data

# Function to insert data into the MySQL database
def insert_location_data_to_db():
    # Query data from API
    data = fetch_location_crop_data()

    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        for location, vals in data.items():
            if location != 'Other (combined) Counties':
                crop_data_json = json.dumps({"crops" : tuple(vals['crops'])})
                record = {'name': location,
                          'crops': crop_data_json,
                          'crops_str': vals['crops_str'],
                          'photo_references': vals['photo_references'],
                          'est': vals['est'],
                          'map': vals['map'],
                          'population': vals['population'],
                          'closest_farmers_markets': vals['closest_farmers_markets'],
                          'closest_charities': vals['closest_charities'],
                          'area': vals['area'],
                          'county_seat': vals['county_seat']}
                insert_query = '''INSERT INTO final_location_data (
                name, 
                crops,
                crops_str,
                photo_references, 
                est, 
                map, 
                population,
                closest_farmers_markets,
                closest_charities,
                area, 
                county_seat) 
                VALUES (
                    %(name)s, 
                    %(crops)s,
                    %(crops_str)s,
                    %(photo_references)s, 
                    %(est)s, 
                    %(map)s, 
                    %(population)s, 
                    %(closest_farmers_markets)s,
                    %(closest_charities)s,
                    %(area)s, 
                    %(county_seat)s);'''
                cursor.execute(insert_query, record)
                connection.commit()

        print("Location data successfully inserted into MySQL database.")

    except mysql.connector.Error as err:
        print(f"Error inserting data into MySQL: {err}")
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

# HELPER METHODS
# return a dictionary of counties with supplemental data such as population, area etc.
def get_county_data():

    county_names = []
    county_url = "https://en.wikipedia.org/wiki/List_of_counties_in_California"
    county_page = requests.get(county_url)
    county_soup = BeautifulSoup(county_page.content, "html.parser")

    county_tables = county_soup.findAll('table')

    rows = county_tables[1].findAll('tr')
    rows = rows[1:]
    for row in rows:
        name = row.find('th').find('a').text
        # get all columns for this row
        cols = row.findAll('td')
        if(len(cols) >= 8):
            county_seat = cols[1].text
            est = int(cols[2].text)
            population = int(cols[6].find('span').text.replace(",", ""))
            area = int(cols[7].find('span').text.replace(",", ""))
            map = "https:" + cols[8].find('span').find('a').find('img')['src']
            county_names.append({
                "name": name, "county_seat": county_seat, "est": est, "population": population, "area": area, "map": map
            })

    response_dict = {}
    for feature in county_names:
        if feature['name'] != 'San Francisco':
            response_dict[" ".join(feature["name"].split()[:-1])] = feature
        else:
            response_dict[(feature["name"])] = feature
    
    # {countyName: {countyData}, countyName: {countyData}}
    return response_dict

# a function that compares a county coordinates to coordinates of all farmer markets and charities
def add_relational_data_to_locations():
    # fetch data
    fm_data = query_fm_data_from_sql()
    charity_data = fetch_charity_data()

    # number of coordinates to set as a threshold for "nearby"
    fm_threshold = FM_THRESHOLD
    ch_threshold = CH_THRESHOLD

    # iterate through charities
    for county in complete_location_data:
        # iterate through farmer markets
        fm_list = []
        loc_point = np.asarray([float(california_counties[county]['latitude']), float(california_counties[county]['longitude'])])
        for fm in fm_data:
            # location_y is latitude and location_x is longitude (idk y)
            fm_point = np.asarray([float(fm[2]), float(fm[1])])
            if np.linalg.norm(fm_point - loc_point) <= fm_threshold:
                fm_list.append(fm[0])
        charities = []

        #iterate through charities
        for charity in charity_data:
            charity_point = np.asarray([float(charity['latitude']), float(charity['longitude'])])
            if np.linalg.norm(charity_point - loc_point) <= ch_threshold:
                charities.append(charity['charityName'])
        complete_location_data[county]['closest_farmers_markets'] = json.dumps({"closest_farmers_markets": tuple(fm_list)})
        complete_location_data[county]['closest_charities'] = json.dumps({"closest_charities": tuple(charities)})
    
    return complete_location_data


#------------------------------------------------------------------------
# FARMERS MARKET DATA
complete_fm_data = {}

# Create Farmers market table
def create_fm_table():
    try:
        # Establish a database connection
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

        # Create the farmers_market_table if it doesn't exist
        create_table_query = """
        CREATE TABLE IF NOT EXISTS final_farmers_market_table (
            id INT AUTO_INCREMENT PRIMARY KEY,
            fnap VARCHAR(255),
            listing_desc VARCHAR(255),
            listing_name VARCHAR(255),
            location_address VARCHAR(255),
            location_desc VARCHAR(255),
            location_indoor VARCHAR(255),
            location_site VARCHAR(255),
            location_site_otherdesc VARCHAR(255),
            location_x DECIMAL(10, 6),
            location_y DECIMAL(10, 6),
            orgnization VARCHAR(255),
            phone VARCHAR(20),
            photo_references JSON,
            rating DECIMAL(3, 1),
            website VARCHAR(255),
            closest_charities JSON,
            closest_locations JSON,
            specialproductionmethods VARCHAR(255),
            wheelchair_accessible VARCHAR(20)
        );
        """
        cursor.execute(create_table_query)
        connection.commit()
        print("Table 'farmers_market_table' created successfully.")

    except mysql.connector.Error as err:
        print(f"Error creating table: {err}")
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

def fetch_fm_data():
    url = "https://www.usdalocalfoodportal.com/api/farmersmarket/?apikey=rG6YJ6KLfS&state=ca&radius=30"
    
    # Execute query
    try: 
        response = requests.request("GET", url)
        if response.status_code == 200:
            res = response.json()
        else:
            print(f"Failed to fetch data from usdalocalfoodportal API. Status Code: {response.status_code}")
            return None
    
    except Exception as excep:
        print(f"Error fetching data from API: {str(excep)}")
        return None
    

    complete_fm_data = res['data'] 

    return complete_fm_data



def insert_fm_data():

    # add relational information on farmer markets compared to charities and crops
    add_relational_data_to_fm()

    try:
        # Establish a database connection
        connection = mysql.connector.connect(**db_config)

        # Create a cursor object to interact with the database
        cursor = connection.cursor()
        
        # Define the SQL INSERT statement
        insert_query = f"""
        INSERT INTO final_farmers_market_table (listing_name, location_address, orgnization, listing_desc, location_x, location_y, location_desc, location_site, location_site_otherdesc, location_indoor, specialproductionmethods, FNAP, closest_charities, closest_locations, photo_references, website, phone, rating, wheelchair_accessible) 
        VALUES ({', '.join(['%s'] * len(complete_fm_data.columns))})
        """

        values = [tuple(row) for _, row in complete_fm_data.iterrows()]
        cursor.executemany(insert_query, values)

        # Commit the changes to the database
        connection.commit()

        print("Farmers Data inserted into the table successfully.")

    except mysql.connector.Error as err:
        print("Error inserting data into the table:", err)

    finally:
        # Close the cursor and connection
        cursor.close()
        connection.close()


# a function that compares a county coordinates to coordinates of all farmer markets and charities
def add_relational_data_to_fm():
     # fetch all fm and charity data
    charity_data = fetch_charity_data()
    fm_data = fetch_charity_data()
    
    # Use latitute/ longitude to find closest charities to farmers' markets
    # Farmers market data lat/ lon columns: location_x/ location_y (floats)
    all_closest_charities = []
    all_closest_locations = []
    ch_threshold = 2.5
    loc_threshold = 2
    for obj in fm_data:
        charities = []
        # location_y is latitude and location_x is longitude (idk y)
        fm_point = np.asarray([float(obj['location_y']), float(obj['location_x'])])
        # find nearby charities
        for charity in charity_data:
            charity_point = np.asarray([float(charity['latitude']), float(charity['longitude'])])
            if np.linalg.norm(fm_point - charity_point) <= ch_threshold:
                charities.append(charity['charityName'])
        loc_list = []

        # find nearby charities
        for loc in california_counties.items():
            loc_point = np.asarray([float(loc[1]['latitude']), float(loc[1]['longitude'])])
            if np.linalg.norm(loc_point - fm_point) <= loc_threshold:
                loc_list.append(loc[0])

        all_closest_charities.append(json.dumps({"nearby_charities": tuple(charities)}))
        all_closest_locations.append(json.dumps({"nearby_locations": tuple(loc_list)}))
    
        obj['closest_charities'] = all_closest_charities
        obj['closest_locations'] = all_closest_charities

        # adding website, phone, rating, wheelchair_accessible, and photo data and more via Google
        more_fm_data = googleAPIFarmersMarkets(fm_data)

        obj['photo_references'] = more_fm_data['photo_references']
        obj['website'] = more_fm_data['website']
        obj['phone'] = more_fm_data['phone']
        obj['rating'] = more_fm_data['rating']
        obj['wheelchair_accessible'] = more_fm_data['wheelchair_accessible']

    # format: [{'nearby_charities': [charity1, charity2, ...]}, {'nearby_charities': []}, {}]
  

   

# helper method for other models 
def query_fm_data_from_sql():
    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor()
    cursor.execute("SELECT listing_name, location_x, location_y FROM farmers_market_table")
    return cursor.fetchall()
#------------------------------------------------------------------------
# CHARITY DATA

# Charity table
def create_charity_table():
    create_table_query = """
    CREATE TABLE IF NOT EXISTS final_charity_table (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category VARCHAR(255),
        charityName VARCHAR(255),
        city VARCHAR(255),
        deductibilityCd INT,
        donationUrl VARCHAR(255),
        ein VARCHAR(10),
        eligibleCd INT,
        latitude DECIMAL(10, 6),
        longitude DECIMAL(10, 6),
        missionStatement TEXT,
        photo_references JSON,
        start INT,
        closest_farmers_markets JSON,
        closest_locations JSON,
        state VARCHAR(255),
        statusCd INT,
        url VARCHAR(255),
        website VARCHAR(255),
        zipCode VARCHAR(10)
    );
    """    

    try:
        # Establish a database connection
        connection = mysql.connector.connect(**db_config)
        # Create a cursor object to interact with the database
        cursor = connection.cursor()
        # Execute the table creation SQL statement
        cursor.execute(create_table_query)

        print("Table 'charity_table' created successfully.")

    except mysql.connector.Error as err:
        print("Error creating table:", err)

    finally:
        # Close the cursor and connection
        cursor.close()
        connection.close()


def fetch_charity_data():
    # We have two API calls here. The API uses search terms to get relevant queries and cannot 
    # query more than one search term at once, so we do it seperetly
    res1 = {}
    res2 = {}
    res3 = {}
    res4 = {}
    res5 = {}
    res6 = {}
    
    # Query one: search term "farmer market"
    url1 = "http://data.orghunter.com/v1/charitysearch?user_key=6abaefdede85bfc1b540f4e9d6ff7882&searchTerm=farmer market&state=CA&rows=100"
    payload = {}
    headers = {
        'Cookie': 'laravel_session=eyJpdiI6IlBvbHJLTDR0SFh3SWdaOXJRbkRzXC9EQk9tUjlRMnVXWmFIMGdmbzgzWU9jPSIsInZhbHVlIjoic204QVBDdFpPSkRKYmZ4RUlxNW1oc3Y2eittR2ZscHR1S01ya2FuYjFjWnFpeUxTeE44SEdxTlhneE82ZWFlMjJsbFdqdGhoWUdXbzBkb3FwcHRlc0E9PSIsIm1hYyI6IjM2ZGZjYmRhOTE4ZTM4MjIwMDUwMmZmY2Q5OTE0NjdjOGE4OThjMTU0YjY5ZjE5ZmJlZmI5MzZjODljYzMxODMifQ%3D%3D'
    }


    try:
        response = requests.request("GET", url1, headers=headers, data=payload)
        if response.status_code == 200:
            res1: dict = response.json()
        else:
            print(f"Failed to fetch data from charity API 1. Status Code: {response.status_code}")
            return None

    except Exception as excep:
        print(f"Error fetching data from API: {str(excep)}")
        return None


    # Query one: search term "agriculture"
    url2 = "http://data.orghunter.com/v1/charitysearch?user_key=6abaefdede85bfc1b540f4e9d6ff7882&searchTerm=agriculture&state=CA"

    payload = {}
    headers = {
    'Cookie': 'laravel_session=eyJpdiI6IlBDYTd3VG9GOU1GSVBvMVwvcDc5RUl5emJMVUFsYzhDdGtHMThcL1dIV3phTT0iLCJ2YWx1ZSI6Ikp5WFpGYUlUQ0s5d0xlZHowZ3ZzSmFVeXZkcXNkTmhFZ3BkNjExNG0zVDU1SjBQaFI1UFp4ajh5blwvbVBRN2hEZTA3NnZZMnFPSnlZVnVwV3gzbG9Hdz09IiwibWFjIjoiZjdkZjIwMjcwN2E4ODFkMGUxZDdkZjFmYmUzOGVhMWYxZTgyZTg0NWMwZWYxMDY1OTBjZDBkMDUxNGEyOTVhYSJ9'
    }

    response = requests.request("GET", url2, headers=headers, data=payload)  

    try:
        response = requests.request("GET", url2, headers=headers, data=payload)
        if response.status_code == 200:
            res2: dict = response.json()
        else:
            print(f"Failed to fetch data from charity API 2. Status Code: {response.status_code}")
            return None

    except Exception as excep:
        print(f"Error fetching data from API: {str(excep)}")
        return None


    # Query three: search term "farmer" with Food Category to narrow down
    url3 = "http://data.orghunter.com/v1/charitysearch?user_key=6abaefdede85bfc1b540f4e9d6ff7882&searchTerm=farmer&state=CA&rows=100&category=K"
    payload = {}
    headers = {
    'Cookie': 'laravel_session=eyJpdiI6IkhLWTNDWFwveXVuM3diK1k4aThFK1RNcFpyVVIrd3hKanRxU3Q5eG52XC9xcz0iLCJ2YWx1ZSI6IisxSkoxU1pkRzJqeXh5UkNoZkJkU084RUpUc2RienZXNTNjN3V3QVFYaXB3QWo5T0g4ZDZhRG5vQ2hwWkZlMVR6ZHdqQVZQRm44dHZIMTBFVWx6UHlRPT0iLCJtYWMiOiIzZDUzNWM4MjgwMGMzODY1OGU0NTUwYjRmOTIzN2UwZTgxMTI4MzU0ZDVmOGIwYTkyNzU5ODNjYWFjMDBmOWMyIn0%3D'
    }
    
    try:
        response = requests.request("GET", url3, headers=headers, data=payload)
        if response.status_code == 200:
            res3: dict = response.json()
        else:
            print(f"Failed to fetch data from charity API 4. Status Code: {response.status_code}")
            return None

    except Exception as excep:
        print(f"Error fetching data from API: {str(excep)}")
        return None

    # Query four: search term "farming"

    url4 = "http://data.orghunter.com/v1/charitysearch?user_key=6abaefdede85bfc1b540f4e9d6ff7882&searchTerm=farming&state=CA"

    payload = {}
    headers = {
    'Cookie': 'laravel_session=eyJpdiI6Im9Jcm1FZENDWW00ZlNjVlFjdk5aeVAzZk5ZV1daamRsT0hhVnRCMGRTNkU9IiwidmFsdWUiOiJsRVNGelltbktqMDBQNjh1b0p2cm9JUkNDS1pZMHNZTUhzcTlVZ2duTXJhMDFHRVhTUWxURFV3WnVHelluWGZsbDdnSVBHajFsajFoUENqWjAzRkNSZz09IiwibWFjIjoiNzJkY2UyMmI2YmRjZGM1NTRkNzVmZDJkZjM1YmZkNGNlOTBmN2RiNmE0ZDVhYTEwYTBlNTI4M2Y2Mzk0OGQ5NyJ9'
    }

    try:
        response = requests.request("GET", url4, headers=headers, data=payload)
        if response.status_code == 200:
            res4: dict = response.json()
        else:
            print(f"Failed to fetch data from charity API 4. Status Code: {response.status_code}")
            return None

    except Exception as excep:
        print(f"Error fetching data from API: {str(excep)}")
        return None


    # query five: search term "product"
    url5 = "http://data.orghunter.com/v1/charitysearch?user_key=6abaefdede85bfc1b540f4e9d6ff7882&searchTerm=produce&state=CA&category=K"

    payload = {}
    headers = {
    'Cookie': 'laravel_session=eyJpdiI6IkkzcGIyU01iVDhJYkV4ZG9IMnNIRjZ6UUwzQ2NpeUljRHl3eEwrQlBwTU09IiwidmFsdWUiOiJ5anBaR3A1Z0Z3RHdMaEFyRk5LYzJHaDd5SVVQNHZVQk84ZWg4RE5sWElEN0JNb0R3VFdrRVludGlERktaN2lqc2xDRGNzaURWMDdWeDZQXC9SRWpuSFE9PSIsIm1hYyI6ImQ1YzQzNzY1OGE5NzFmNjc5MDk5NDNlYTJmN2YzNzU2YzBkNTExYWEyYTc3ZmRjMjgxZWY1Y2Y1NzI3MDAyZmIifQ%3D%3D'
    }

    try:
        response = requests.request("GET", url5, headers=headers, data=payload)
        if response.status_code == 200:
            res5: dict = response.json()
        else:
            print(f"Failed to fetch data from charity API 4. Status Code: {response.status_code}")
            return None

    except Exception as excep:
        print(f"Error fetching data from API: {str(excep)}")
        return None



    # query six: search term "vegetable"
    url6 = "http://data.orghunter.com/v1/charitysearch?user_key=6abaefdede85bfc1b540f4e9d6ff7882&searchTerm=vegetable&state=CA"

    payload = {}
    headers = {
    'Cookie': 'laravel_session=eyJpdiI6IkNlZFNwWlhzdmhvbVRGd0hKek1MbFVxUlk3OVhMMjJGclF5QUhcL3haWlNzPSIsInZhbHVlIjoiaG5nR2hkZ2dZR2x6NUl2YTRJa013ZnZkUDBLRHI0TXBXQ25RUkZcL1F4VUNUekhLSUd1RmdOVnRXSWhuOWdQTHBiVjgyOGFZcDVzcFl3VjV3Q0FXSFVRPT0iLCJtYWMiOiJiNjljNDAxY2U1NTQxNDMyMzVkYWRmYTQ5Y2I4YmQ4ZGRiZjA0N2Q0YmFhZDU1NzRlNmI1OGZkNDU2ZTRjNzdmIn0%3D'
    }

    try:
        response = requests.request("GET", url6, headers=headers, data=payload)
        if response.status_code == 200:
            res6: dict = response.json()
        else:
            print(f"Failed to fetch data from charity API 4. Status Code: {response.status_code}")
            return None

    except Exception as excep:
        print(f"Error fetching data from API: {str(excep)}")
        return None

    # Join the seperate API calls in a singular list of data points
    res: list = res1['data']
    res.extend(res2['data'])
    res.extend(res3["data"])
    res.extend(res4['data'])
    res.extend(res5['data'])
    
    googleAPINonProfit(res)
    
    # Quick filter to only keep charities that have appropriate latitude/ longitude
    # values
    final_res = []
    for charity in res:
        charity_point = np.asarray([float(charity['latitude']), float(charity['longitude'])])
        if np.linalg.norm(charity_point) != 0:
            final_res.append(charity)
    
    fm_data = query_fm_data_from_sql()
    # List of farmers' markets tuples: (name, location_x, location_y)
    
    fm_threshold = 2.5
    loc_threshold = 0.5
    for charity in final_res:
        charity_point = np.asarray([float(charity['latitude']), float(charity['longitude'])])
        fm_list = []
        for fm in fm_data:
            # location_y is latitude and location_x is longitude (idk y)
            fm_point = np.asarray([float(fm[2]), float(fm[1])])
            if np.linalg.norm(fm_point - charity_point) <= fm_threshold:
                fm_list.append(fm[0])
        loc_list = []
        for loc in california_counties.items():
            loc_point = np.asarray([float(loc[1]['latitude']), float(loc[1]['longitude'])])
            if np.linalg.norm(loc_point - charity_point) <= loc_threshold:
                loc_list.append(loc[0])
        charity['closest_farmers_markets'] = json.dumps({"closest_farmers_markets": tuple(fm_list)})
        charity['closest_locations'] = json.dumps({"closest_locations": tuple(loc_list)})
    return final_res


def insert_charity_crop_data_to_db():
    data = fetch_charity_data()
    
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

        for record in data:
            # Define the SQL INSERT statement
            insert_query = '''
                INSERT INTO final_charity_table (
                    ein,
                    charityName,
                    url,
                    donationUrl,
                    city,
                    state,
                    zipCode,
                    start,
                    closest_farmers_markets,
                    closest_locations,
                    category,
                    eligibleCd,
                    deductibilityCd,
                    statusCd,
                    website,
                    missionStatement,
                    latitude,
                    longitude,
                    photo_references

                ) VALUES (
                    %(ein)s,
                    %(charityName)s,
                    %(url)s,
                    %(donationUrl)s,
                    %(city)s,
                    %(state)s,
                    %(zipCode)s,
                    %(start)s,
                    %(closest_farmers_markets)s,
                    %(closest_locations)s,
                    %(category)s,
                    %(eligibleCd)s,
                    %(deductibilityCd)s,
                    %(statusCd)s,
                    %(website)s,
                    %(missionStatement)s,
                    %(latitude)s,
                    %(longitude)s,
                    %(photo_references)s
                )
            '''
        
            # Iterate through the API data and insert it into the MySQL database
            cursor.execute(insert_query, record)

        # Commit the changes to the database
        connection.commit()

        print("Data inserted into the database successfully.")

    except mysql.connector.Error as err:
        print("Error inserting data into the database:", err)

    finally:
        # Close the cursor and connection
        if connection.is_connected():
            cursor.close()
            connection.close()




# Defining main function
def main(): 
    # location crop data DONE
    create_location_table()
    insert_location_data_to_db()
    

    # charities data DONE
    # create_charity_table()
    # insert_charity_crop_data_to_db()

    # Farmer Market data DONE
    # create_fm_table()
    # insert_fm_data()

if __name__=="__main__": 
    main() 


