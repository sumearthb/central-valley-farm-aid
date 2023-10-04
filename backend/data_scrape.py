import requests
import mysql.connector


# Fetch data from the API
api_calls = [
    "put all API calls here",
]
# MySQL database connection details
db_config = {
    "host": "YOUR_DB_HOST",
    "user": "YOUR_DB_USER",
    "password": "YOUR_DB_PASSWORD",
    "database": "YOUR_DB_NAME",
}
 
# Function to fetch data from the API
def fetch_data_from_api(url):
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
