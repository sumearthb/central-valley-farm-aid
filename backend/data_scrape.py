import requests
import mysql.connector

# ssh -i /Users/akifa/Desktop/UT_Austin/SWE/cs373-ruralFarmAid/akif_key_main.pem ec2-user@ec2-54-144-39-129.compute-1.amazonaws.com

'''
1. Fetch API calls, decode to json. Every object is a unordered (jumbled) list of keypairs, but 
    all objeects have commodity, county and short desc. 
2. send relevant info to DB

'''

# MySQL database connection details
db_config = {
    "host": "YOUR_DB_HOST",
    "user": "YOUR_DB_USER",
    "password": "YOUR_DB_PASSWORD",
    "database": "YOUR_DB_NAME",
}


# Create SQL Data tables
def create_crop_table():
    # The SQL query to create a new table
    create_table_query = """
    CREATE TABLE IF NOT EXISTS your_table_name (
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

        print("Table created successfully.")

    except mysql.connector.Error as err:
        print("Error creating the table:", err)

    finally:
        # Close the cursor and connection
        cursor.close()
        connection.close()


#------------------------------------------------------------------------
# CHARITY DATA
def fetch_charity_data() -> dict:
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
            print("CHARITY DATA 1-----", res1)
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
            print("CHARITY DATA 2-----", res2)
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
            print("CHARITY DATA 3-----", res3)
        else:
            print(f"Failed to fetch data from charity API 4. Status Code: {response.status_code}")
            return None

    except Exception as excep:
        print(f"Error fetching data from API: {str(excep)}")
        return None

    
    # Join the seperate API calls
    res: dict = res1.update(res2)
    res = res.update(res3)

    return res

#------------------------------------------------------------------------
# CROP DATA
def fetch_location_crop_data() -> dict:
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
            print("CROP DATA-----", res.data.count)
            return response.json()
        else:
            print(f"Failed to fetch data from nass.usda API. Status Code: {response.status_code}")
            return None
    
    except Exception as excep:
        print(f"Error fetching data from API: {str(excep)}")
        return None

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
                INSERT INTO crop_data (
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
            values = (record['column1'], record['column2'], ...)  # Replace with actual data
            cursor.execute(insert_query, values)

        connection.commit()
        print("Location_crop successfully inserted into MySQL database.")

    except mysql.connector.Error as err:
        print(f"Error inserting data into MySQL: {err}")
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

if __name__ == "__main__":

    # location crop data
    insert_location_crop_data_to_db(db_config=db_config)

