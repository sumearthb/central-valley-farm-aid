
import requests


def getCharityLongitudeLatitude():

    url = "https://www.centralvalleyfarmaid.me/api/GetAllNonProfit?page=1&per_page=1000"

    payload = {}
    headers = {}

    response = requests.request("GET", url, headers=headers, data=payload)

    data = response.json().get('data')

    result_array = []
    for entry in data:
        longitude = entry.get("longitude")
        latitude = entry.get("latitude")

        result_array.append([longitude, latitude])

    print(result_array)


getCharityLongitudeLatitude()
