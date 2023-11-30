
import requests

def getProviderZipCodeData():
    url = "https://api.feedingspace.city/get_all_zipcodes?page=1&per_page=100000"

    payload = {}
    headers = {}

    response = requests.request("GET", url, headers=headers, data=payload)


    data = response.json()

    # Extracting information from each object in the list
    result_array = []
    for entry in data:
        zip_code = entry.get("zip_code")
        median_household_income = entry.get("median_household_income")
        population = entry.get("population")

        # Convert median_household_income and population to numerical values
        median_household_income = int(median_household_income.replace(",", "").replace("$", ""))
        population = int(population.replace(",", ""))


        result_array.append([zip_code, median_household_income, population])

    # Pipe the data to a text file
    print(result_array)



getProviderZipCodeData()

