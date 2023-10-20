from bs4 import BeautifulSoup
import requests
from typing import List
from typing import Dict
import json


def get_all_counties_in_california() -> List[str]:

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
        response_dict[feature["name"]] = json.dumps(feature)
    return response_dict

if __name__=="__main__": 
    get_all_counties_in_california()

