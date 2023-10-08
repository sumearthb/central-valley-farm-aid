import requests
import mysql.connector

# ssh -i /Users/akifa/Desktop/UT_Austin/SWE/cs373-ruralFarmAid/akif_key_main.pem ec2-user@ec2-54-144-39-129.compute-1.amazonaws.com

'''
1. Fetch API calls, decode to json. Every object is a unordered (jumbled) list of keypairs, but 
    all objeects have commodity, county and short desc. 
2. send relevcant info to DB

'''

# MySQL database connection details
db_config = {
    "host": "YOUR_DB_HOST",
    "user": "YOUR_DB_USER",
    "password": "YOUR_DB_PASSWORD",
    "database": "YOUR_DB_NAME",
}

# Function to fetch data from the API
def fetch_location_crop_data():
    url = "https://quickstats.nass.usda.gov/api/api_GET/?key=2937E8A6-338E-3BD9-8E2E-1EF47FF8D729&sector_desc=crops&year=2018&state_alpha=CA&agg_level_desc=County&county_name=Glenn&county_name=Colusa&county_name=Kings&county_name=Kern&county_name=Sacremento&county_name=San Joaquin&county_name=Madera&county_name=Merced&county_name=Sutter&county_name=Yolo&county_name=Tulare&county_name=Tehama&county_name=Fresno"
    payload = "2937E8A6-338E-3BD9-8E2E-1EF47FF8D729\n"
    headers = {
    'Content-Type': 'text/plain',
    'Cookie': 'quickstats_session=8d2caf8817c780bfdf00f743ccb75759328623ad'
    }
    
    try: 
        response = requests.request("GET", url, headers=headers, data=payload)
        if response.status_code == 200:
            res = response.json()
            print(res.data.count)
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
                INSERT INTO your_table_name (
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

