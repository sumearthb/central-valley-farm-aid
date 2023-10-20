# Import flask and datetime module for showing date and time
from flask import Flask, request, jsonify, Response
from models import Locations, NPs, FMs, app, db
from schema import LocationSchema, NPSchema, FMSchema
from flask_cors import CORS
from sqlalchemy import or_, func, and_, Integer
from sqlalchemy.sql.expression import asc, desc
from countydata import get_all_counties_in_california
import googlemaps

gmaps = googlemaps.Client(key='AIzaSyBMJJbFxLfnX8DpE_BGF2dF8t5aWSQJOOs')

# size for each page -- pagination
PER_PAGE = 9

@app.route('/api')
def home():
	return "Welcome to Central Valley Farm Aid!" 
    
"""
Implementation for search and filtering-specific 
endpoints will be completed in phase 3
"""

# TODO ~ phase 3
@app.route('/api/SearchAll')
def search_all():
    return 0

@app.route("/api/GetLocations/<name>", methods = ['GET'])
def get_locations(name):
    query = db.session.query(Locations).filter_by(location=name)
    location_list = []
    for location in query:
        location_schema = LocationSchema()
        location_dict = location_schema.dump(location)
        location_list.append(location_dict)
    response = jsonify({"instance_count" : len(location_list), "data" : location_list})
    return response

@app.route("/api/GetAllLocations", methods = ['GET'])
def get_all_locations():
    page = request.args.get("page") 
    per_page = request.args.get("per_page")
    query = db.session.query(Locations)
    if page is not None:
        query = paginate(query, int(page), int(per_page))
    location_list = []
    int
    for location in query:
        location_schema = LocationSchema()
        location_dict = location_schema.dump(location)

        # Default Value
        # photo_references = []

        # # Call Google API
        # find_place = gmaps.find_place(
        #     location_dict["location"] + " County, CA",
        #     "textquery",
        #     fields=["photos"]) # This is the different fields u can get from a place, for locations we only want photos
        
        # # Add data if exists
        # if (len(find_place["candidates"]) > 0):
        #     print("", find_place["candidates"])
        #     photo_references = []
        #     photos = find_place["candidates"][0].get("photos", [])
        #     for photo in photos:
        #         photo_references.append(photo["photo_reference"])
        # location_dict["photo_references"] = photo_references

        #location_dict["county_scraped"] = get_all_counties_in_california()

        location_list.append(location_dict)
    response = jsonify({"instance_count" : len(location_list), "data" : location_list})
    return response

@app.route("/api/GetNonProfit/<name>", methods = ['GET'])
def get_nonprofit(name):
    query = db.session.query(NPs).filter_by(charityName=name)
    NP_list = []
    for NP in query:
        NP_schema = NPSchema()
        NP_dict = NP_schema.dump(NP)
        NP_list.append(NP_dict)
    response = jsonify({"instance_count" : len(NP_list), "data" : NP_list})
    return response 

@app.route("/api/GetAllNonProfit", methods = ['GET'])
def get_all_nonprofits():
    page = request.args.get("page")
    per_page = request.args.get("per_page")
    query = db.session.query(NPs)
    if page is not None:
        query = paginate(query, int(page), int(per_page))
    NP_list = []
    for NP in query:
        NP_schema = NPSchema()
        NP_dict = NP_schema.dump(NP)
        # find_place = gmaps.find_place(
        #     NP_dict["charityName"],
        #     "textquery",
        #     fields=["photos"]) # This is the different fields u can get from a place, for locations we only want photos

        # photo_reference = find_place['candidates'][0]['photos'][0]['photo_reference']
        # NP_dict["photo_reference"] = photo_reference
        # Default Value
        # photo_references = []
        # bias_string = "circle:1000000@{},{}".format(NP_dict.get("latitude", 37.2917), NP_dict.get("longitude", -119.9789))
        # # Call Google API
        # find_place = gmaps.find_place(
        #     NP_dict["charityName"] + " nonprofit",
        #     "textquery",
        #     location_bias = bias_string,
        #     fields=["photos"]) # This is the different fields u can get from a place, for locations we only want photos
        
        # # Add data if exists
        # if (len(find_place["candidates"]) > 0):
        #     print("", find_place["candidates"])
        #     photo_references = []
        #     photos = find_place["candidates"][0].get("photos", [])
        #     for photo in photos:
        #         photo_references.append(photo["photo_reference"])
        # NP_dict["photo_references"] = photo_references
        NP_list.append(NP_dict)
    response = jsonify({"instance_count" : len(NP_list), "data" : NP_list})
    return response 

@app.route("/api/GetMarket/<name>", methods = ['GET'])
def get_market(name):
    query = db.session.query(FMs).filter_by(listing_name=name)
    FM_list = []
    for FM in query:
        FM_schema = FMSchema()
        FM_dict = FM_schema.dump(FM)
        FM_list.append(FM_dict)
    response = jsonify({"instance_count" : len(FM_list), "data" : FM_list})
    return response

@app.route("/api/GetAllMarkets", methods = ['GET'])
def get_all_markets():
    page = request.args.get("page")
    per_page = request.args.get("per_page")
    query = db.session.query(FMs)
    if page is not None:
        query = paginate(query, int(page), int(per_page))
    FM_list = []
    for FM in query:
        FM_schema = FMSchema()
        FM_dict = FM_schema.dump(FM)

        # # Default Values
        # website = ""
        # phone = ""
        # rating = 0
        # wheelchair_accessible = False
        # photo_references = []

        # # Call Google API
        # bias_string = "circle:3000@{},{}".format(FM_dict["location_y"], FM_dict["location_x"])
        # find_place = gmaps.find_place(
        #     FM_dict["listing_name"],
        #     "textquery",
        #     location_bias=bias_string,
        #     fields=["place_id"]) # Get the place_id because google API is stupid
        # places: list = find_place['candidates']

        # # Add data if exists
        # if (len(places) > 0):
        #     place_id = places[0]["place_id"]
            
        #     place_dict: dict = gmaps.place(place_id)["result"]

        #     website = place_dict.get("website", "")
        #     phone = place_dict.get("formatted_phone_number", "")
        #     rating = place_dict.get("rating")
        #     wheelchair_accessible = place_dict.get("wheelchair_accessible_entrance", False)
        #     photos = place_dict.get("photos", [])
        #     for photo in photos:
        #         photo_references.append(photo["photo_reference"])

        #     FM_dict["website"] = website
        #     FM_dict["phone"] = phone
        #     FM_dict["rating"] = rating
        #     FM_dict["wheelchair_accessible"] = wheelchair_accessible
        #     FM_dict["photo_references"] = photo_references
        
        FM_list.append(FM_dict)
    response = jsonify({"instance_count" : len(FM_list), "data" : FM_list})
    return response

@app.route("/api/GetNumLocations")
def get_num_locations():
    query = db.session.query(Locations)
    count = query.count()
    return jsonify({"count": count})

@app.route("/api/GetNumNonProfits")
def get_num_nonprofits():
    query = db.session.query(NPs)
    count = query.count()
    return jsonify({"count": count})

@app.route("/api/GetNumMarkets")
def get_num_markets():
    query = db.session.query(FMs)
    count = query.count()
    return jsonify({"count": count})

def paginate(query, page_num, page_size=PER_PAGE):
    return query.paginate(page=page_num, per_page=page_size, error_out=False).items

# Running app
if __name__ == '__main__':
	app.run(host="0.0.0.0", port=5000, debug = True)

