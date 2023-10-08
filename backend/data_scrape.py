import requests
import mysql.connector

# ssh -i /Users/akifa/Desktop/UT_Austin/SWE/cs373-ruralFarmAid/akif_key_main.pem ec2-user@ec2-54-144-39-129.compute-1.amazonaws.com

'''
1. Fetch API calls, decode to json 
2. send to DB
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

    response = requests.request("GET", url, headers=headers, data=payload)
    try:
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()
        else:
            print(f"Failed to fetch data from API. Status Code: {response.status_code}")
            return None
    except Exception as excep:
        print(f"Error fetching data from API: {str(excep)}")
        return None

# Function to insert data into the MySQL database
def insert_data_into_mysql(data, db_config):
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

        # Assuming 'data' is a list of dictionaries
        for record in data:
            # Customize this part to match your data structure
            query = """
                INSERT INTO your_table_name (column1, column2, ...)
                VALUES (%s, %s, ...);
            """
            values = (record['column1'], record['column2'], ...)  # Replace with actual data
            cursor.execute(query, values)

        connection.commit()
        print("Data successfully inserted into MySQL database.")

    except mysql.connector.Error as err:
        print(f"Error inserting data into MySQL: {err}")
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

if __name__ == "__main__":
    for api_url in api_calls:
        api_data = fetch_data_from_api(api_url)
        if api_data:
            # Insert data into the MySQL database
            insert_data_into_mysql(api_data, db_config)
