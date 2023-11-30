import requests
import json

# GAMEPLAN:
# Make a dictionary with counties as key and empty list, which will be populated with counties
# Iterate through all data from charitiesLocationData.json and put into API
# Find the county for the coordinates and populate dic

def getAllCounties():
    url = "https://www.centralvalleyfarmaid.me/api/GetAllLocations?page=1&per_page=1000"

    payload = {}
    headers = {}

    response = requests.request("GET", url, headers=headers, data=payload)

    return response.json().get("data")

def getAllNonProfits():
    url = "https://www.centralvalleyfarmaid.me/api/GetAllNonProfit?page=1&per_page=1000"

    payload = {}
    headers = {}

    response = requests.request("GET", url, headers=headers, data=payload)

    return response.json().get("data")



def populateDictWithCounties(NPCountyMappingDict, countiesData) :
    for county in countiesData:
        countyName = county.get('county_seat')
        NPCountyMappingDict[countyName] = []

    
def sortNonProfitsToCounty(NPCountyMappingDict, np_data):
    payload = {}
    headers = {}
    count = 0
    for nonProfit in np_data:
        lat = round(nonProfit[1], 2)
        long = round(nonProfit[0], 2)
        url = f'https://geo.fcc.gov/api/census/area?lat={lat}&lon={long}&censusYear=2020&format=json'
        response = requests.request("GET", url, headers=headers, data=payload).json().get('results')
        if response:
            county = response[0]['county_name'].rsplit(' ', 1)[0]
            # add to the corresponding county in the dictionary
            countyNonProfitList = NPCountyMappingDict[county] 
            countyNonProfitList.append([lat, long])
        count += 1

def getNPCoordData():
    # Specify the path to your JSON file
    json_file_path = './charitiesLocationData.json'

    # Open the JSON file and load its content
    with open(json_file_path, 'r') as json_file:
        np_coord_data = json.load(json_file)

    return(np_coord_data.get('data'))


def exportDictionary(NPCountyMappingDict):
    with open("charityCountyMapping.json", "w") as outfile: 
        json.dump(NPCountyMappingDict, outfile)
    

countiesData = getAllCounties()
NPCountyMappingDict = {
  "Alameda": [],
  "Alpine": [],
  "Amador": [],
  "Butte": [],
  "Calaveras": [],
  "Colusa": [],
  "Contra Costa": [],
  "Del Norte": [],
  "El Dorado": [],
  "Fresno": [],
  "Glenn": [],
  "Humboldt": [],
  "Imperial": [],
  "Inyo": [],
  "Kern": [],
  "Kings": [],
  "Lake": [],
  "Lassen": [],
  "Los Angeles": [],
  "Madera": [],
  "Marin": [],
  "Mariposa": [],
  "Mendocino": [],
  "Merced": [],
  "Modoc": [],
  "Mono": [],
  "Monterey": [],
  "Napa": [],
  "Nevada": [],
  "Orange": [],
  "Placer": [],
  "Plumas": [],
  "Riverside": [],
  "Sacramento": [],
  "San Benito": [],
  "San Bernardino": [],
  "San Diego": [],
  "San Francisco": [],
  "San Joaquin": [],
  "San Luis Obispo": [],
  "San Mateo": [],
  "Santa Barbara": [],
  "Santa Clara": [],
  "Santa Cruz": [],
  "Shasta": [],
  "Sierra": [],
  "Siskiyou": [],
  "Solano": [],
  "Sonoma": [],
  "Stanislaus": [],
  "Sutter": [],
  "Tehama": [],
  "Trinity": [],
  "Tulare": [],
  "Tuolumne": [],
  "Ventura": [],
  "Yolo": [],
  "Yuba": []
}

# populateDictWithCounties(NPCountyMappingDict, countiesData)
sortNonProfitsToCounty(NPCountyMappingDict, getNPCoordData())


empty = 0
largest = -1
for np_list in NPCountyMappingDict.values():
    if np_list == []:
        empty += 1
    largest = max(largest, len(np_list))
    

print("EMPTY: " , empty)
print("LARGEST: ", largest)


exportDictionary(NPCountyMappingDict)