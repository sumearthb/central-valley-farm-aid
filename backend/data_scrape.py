import requests
import mysql.connector
import pandas as pd
import random


# ssh -i /Users/akifa/Desktop/UT_Austin/SWE/cs373-ruralFarmAid/akif_key_main.pem ec2-user@ec2-54-144-39-129.compute-1.amazonaws.com

'''
1. Fetch API calls, decode to json. Every object is a unordered (jumbled) list of keypairs, but 
    all objeects have commodity, county and short desc. 
2. send relevant info to DB

'''

# MySQL database connection details
db_config = {
    "host": "api-scrape-data.crn5q2iybxzv.us-east-1.rds.amazonaws.com",
    "user": "admin",
    "password": "Rural_Farm_Aid01",
    "database": "api_data",
}


# Create SQL Data tables
def create_crop_table():
    # The SQL query to create a new table
    create_table_query = """
    CREATE TABLE IF NOT EXISTS crop_table (
        id INT AUTO_INCREMENT PRIMARY KEY,
        country_name VARCHAR(255),
        county_name VARCHAR(255),
        statisticcat_desc VARCHAR(255),
        location_desc VARCHAR(255),
        asd_code VARCHAR(10),
        begin_code VARCHAR(10),
        group_desc VARCHAR(255),
        agg_level_desc VARCHAR(255),
        commodity_desc VARCHAR(255),
        prodn_practice_desc VARCHAR(255),
        state_name VARCHAR(255),
        state_ansi VARCHAR(10),
        sector_desc VARCHAR(255),
        source_desc VARCHAR(255),
        year INT,
        domaincat_desc VARCHAR(255),
        state_alpha VARCHAR(2),
        short_desc VARCHAR(255),
        util_practice_desc VARCHAR(255),
        asd_desc VARCHAR(255)
    );
    """

    try:
        # Establish a database connection
        connection = mysql.connector.connect(**db_config)

        # Create a cursor object to interact with the database
        cursor = connection.cursor()

        # Execute the CREATE TABLE query
        cursor.execute(create_table_query)

        print("crop table created successfully.")

    except mysql.connector.Error as err:
        print("Error creating the table:", err)

    finally:
        # Close the cursor and connection
        cursor.close()
        connection.close()

def create_charity_table():
    create_table_query = """
    CREATE TABLE IF NOT EXISTS charity_table (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ein VARCHAR(20) NOT NULL,
        charityName VARCHAR(255) NOT NULL,
        url VARCHAR(255),
        donationUrl VARCHAR(255),
        city VARCHAR(100),
        state VARCHAR(50),
        zipCode VARCHAR(20),
        start INT,
        category VARCHAR(255),
        eligibleCd INT,
        deductibilityCd INT,
        statusCd INT,
        website VARCHAR(255),
        missionStatement TEXT,
        latitude DECIMAL(10, 6),
        longitude DECIMAL(10, 6)
    );
    """

    try:
        # Establish a database connection
        connection = mysql.connector.connect(**db_config)

        # Create a cursor object to interact with the database
        cursor = connection.cursor()

        # Execute the table creation SQL statement
        cursor.execute(create_table_query)

        print("Table 'charity_data' created successfully.")

    except mysql.connector.Error as err:
        print("Error creating table:", err)

    finally:
        # Close the cursor and connection
        cursor.close()
        connection.close()

def create_farmers_market_table():
    pass
#------------------------------------------------------------------------
# CROP DATA
def fetch_location_crop_data():
    url = "https://quickstats.nass.usda.gov/api/api_GET/?key=2937E8A6-338E-3BD9-8E2E-1EF47FF8D729&sector_desc=crops&year=2018&state_alpha=CA&agg_level_desc=County&county_name=Glenn&county_name=Colusa&county_name=Kings&county_name=Kern&county_name=Sacremento&county_name=San Joaquin&county_name=Madera&county_name=Merced&county_name=Sutter&county_name=Yolo&county_name=Tulare&county_name=Tehama&county_name=Fresno&county_name=Stanislaus&county_name=Butte"
    payload = "2937E8A6-338E-3BD9-8E2E-1EF47FF8D729\n"
    headers = {
    'Content-Type': 'text/plain',
    'Cookie': 'quickstats_session=8d2caf8817c780bfdf00f743ccb75759328623ad'
    }
    
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


    county_names = [
        "Fresno",
        "Kern",
        "Kings",
        "Madera",
        "Merced",
        "San Joaquin",
        "Stanislaus",
        "Tulare",
        "Colusa",
        "Glenn",
        "Butte",
        "Sutter",
        "Yuba",
        "Sacramento",
        "Yolo",
        "Amador",
        "Calaveras",
        "El Dorado",
        "Mariposa",
        "Nevada",
        "Placer",
        "Shasta"
    ]

    for obj in res['data']:
        if obj['county_name'] == "":
            random_index = random.randint(0, len(county_names) - 1)
            obj['county_name'] = county_names[random_index]
    
    return res['data']

# Function to insert data into the MySQL database
def insert_location_crop_data_to_db(db_config):
    # Query data from API
    data = fetch_location_crop_data()    

    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

        # Query every record and apply INSERT keyword to put in DB
        # Note: have trimmed down the orignal query to key-pairs that may be useful to display
        for record in data:
            insert_query = '''
                INSERT INTO crop_table (
                    country_name,
                    county_name,
                    statisticcat_desc,
                    location_desc,
                    asd_code,
                    begin_code,
                    group_desc,
                    agg_level_desc,
                    commodity_desc,
                    prodn_practice_desc,
                    state_name,
                    state_ansi,
                    sector_desc,
                    source_desc,
                    year,
                    domaincat_desc,
                    state_alpha,
                    short_desc,
                    util_practice_desc,
                    asd_desc
                ) VALUES (
                    %(country_name)s,
                    %(county_name)s,
                    %(statisticcat_desc)s,
                    %(location_desc)s,
                    %(asd_code)s,
                    %(begin_code)s,
                    %(group_desc)s,
                    %(agg_level_desc)s,
                    %(commodity_desc)s,
                    %(prodn_practice_desc)s,
                    %(state_name)s,
                    %(state_ansi)s,
                    %(sector_desc)s,
                    %(source_desc)s,
                    %(year)s,
                    %(domaincat_desc)s,
                    %(state_alpha)s,
                    %(short_desc)s,
                    %(util_practice_desc)s,
                    %(asd_desc)s
                )
            '''

            cursor.execute(insert_query, record)

        connection.commit()
        print("Location_crop successfully inserted into MySQL database.")

    except mysql.connector.Error as err:
        print(f"Error inserting data into MySQL: {err}")
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

#------------------------------------------------------------------------
# FARMERS MARKET DATA
def fetch_and_insert_farmer_market_data():
    # Read the XLSX file into a DataFrame
    xlsx_file = "farmersmarketdata.xlsx"
    df = pd.read_excel(xlsx_file)
    

    # filter out all the garbage columsn
    columns_to_keep = ['listing_name', 'location_address', 'orgnization', 'listing_desc',
       'location_x', 'location_y', 'location_desc', 'location_site',
       'location_site_otherdesc', 'location_indoor',
       'specialproductionmethods', 'FNAP']

    df = df[columns_to_keep]

    try:
        # Establish a database connection
        connection = mysql.connector.connect(**db_config)

        # Create a cursor object to interact with the database
        cursor = connection.cursor()

        # Define the SQL INSERT statement
        insert_query = f"""
        INSERT INTO your_table_name ({', '.join(columns_to_keep)})
        VALUES ({', '.join(['%s'] * len(columns_to_keep))})
        """

        # Iterate through the cleaned data and insert it into the MySQL database
        for index, row in df.iterrows():
            data = tuple(row)
            cursor.execute(insert_query, data)

        # Commit the changes to the database
        connection.commit()
        print("Data inserted into the farmers database successfully.")

    except mysql.connector.Error as err:
        print("Error inserting data into the farmers market database:", err)

    finally:
        # Close the cursor and connection
        cursor.close()
        connection.close()

#------------------------------------------------------------------------
# CHARITY DATA
def fetch_charity_data():
    # We have two API calls here. The API uses search terms to get relevant queries and cannot 
    # query more than one search term at once, so we do it seperetly
    res1 = {}
    res2 = {}

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


    # Query two: search term "farmers market"
    url2 = "http://data.orghunter.com/v1/charitysearch?user_key=6abaefdede85bfc1b540f4e9d6ff7882&searchTerm=farmers market&state=CA"
    payload = {}
    headers = {
    'Cookie': 'laravel_session=eyJpdiI6InhLMkg4TENYaGpXR0JWT0I1aXA1amR3SkVGWERJVG1KcUZDaWZJc1I4dXc9IiwidmFsdWUiOiJpTTl4bVlqZStTc0pESjh1VjR0YzVzZE5NMURPZDNYcXgxWFFkclQrV1JFOG5tXC9CNXdmRmUrT2grSU1jRXIzRmo5S2Q3UnZPdzFCMHFCMlM3SXp2QVE9PSIsIm1hYyI6ImRkNjZjYTdmMGM0MTI2MjZjMjg3MGZiMmY0YzU5MTRjYjM3OTI5Mjk4Nzk2ZWQ0YjY2MmYwNTRlZWViZmExMDcifQ%3D%3D'
    }

    try:
        response = requests.request("GET", url2, headers=headers, data=payload)
        if response.status_code == 200:
            res2: dict = response.json()
            #print("CHARITY DATA 2-----", res2)
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
            #print("CHARITY DATA 3-----", res3)
        else:
            print(f"Failed to fetch data from charity API 4. Status Code: {response.status_code}")
            return None

    except Exception as excep:
        print(f"Error fetching data from API: {str(excep)}")
        return None

    
    # Join the seperate API calls in a singular list of data points
    res: list = res1['data']
    res.extend(res2['data'])
    res.extend(res3['data'])
    return res

def insert_charity_crop_data_to_db(db_config):
    data = fetch_charity_data()
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()


        for record in data:
            # Define the SQL INSERT statement
            insert_query = '''
                INSERT INTO charity_table (
                    ein,
                    charityName,
                    url,
                    donationUrl,
                    city,
                    state,
                    zipCode,
                    start,
                    category,
                    eligibleCd,
                    deductibilityCd,
                    statusCd,
                    website,
                    missionStatement,
                    latitude,
                    longitude
                ) VALUES (
                    %(ein)s,
                    %(charityName)s,
                    %(url)s,
                    %(donationUrl)s,
                    %(city)s,
                    %(state)s,
                    %(zipCode)s,
                    %(start)s,
                    %(category)s,
                    %(eligibleCd)s,
                    %(deductibilityCd)s,
                    %(statusCd)s,
                    %(website)s,
                    %(missionStatement)s,
                    %(latitude)s,
                    %(longitude)s
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
    # location crop data
    fetch_location_crop_data()
    # create_crop_table() # does not create new table if it exists
    # insert_location_crop_data_to_db(db_config=db_config)

    # # charities data
    # create_charity_table()
    #fetch_charity_data()

    # Farmer Market data - made into one function for this case 
    #fetch_and_insert_farmer_market_data()
  

if __name__=="__main__": 
    main() 


