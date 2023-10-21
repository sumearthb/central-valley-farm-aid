# Import flask and datetime module for showing date and time
from flask import Flask, request, jsonify, Response
from models import Locations, NPs, FMs, app, db
from schema import LocationSchema, NPSchema, FMSchema
from flask_cors import CORS
from sqlalchemy import or_, func, and_, Integer
from sqlalchemy.sql.expression import asc, desc
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
    query = db.session.query(Locations).filter_by(name=name)
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

