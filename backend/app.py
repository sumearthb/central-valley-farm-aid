# Import flask and datetime module for showing date and time
from flask import Flask, request, jsonify, Response
from models import Locations, NPs, FMs, app, db
from schema import LocationSchema, NPSchema, FMSchema
from flask_cors import CORS
from sqlalchemy import or_, func, and_, Integer
from sqlalchemy.sql.expression import asc, desc


# python app.py to run dev server
# Flask handles incoming HTTP req, uses SQLAlch to interact with database, then
# marshmallow schemas to format data before sending it as json response to clients

# Initializing flask app
app = Flask(__name__)

# size for each page -- pagination
PAGE_SIZE = 20

# Route for seeing a data
@app.route('/')
def home():
	return "Welcome to Central Valley Farm Aid!" 
    
"""
Implementation for search and filtering-specific 
endpoints will be completed in phase 3

Phase 2 will see the implementation of the GetAll__ endpoints
"""

# TODO ~ phase 3
@app.route('/api/SearchAll')
def search_all():
    return 0

def query_locations():
    query = db.session.query(Locations)
    return query

def query_NPs():
    query = db.session.query(NPs)
    return query

def query_FMs():
    query = db.session.query(FMs)
    return query

@app.route("/api/GetLocations/<name>", methods = ['GET'])
def get_locations(name):
    query = db.session.query(Locations).filter_by(county_name=name)
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
    query = query_locations()
    if page is not None:
        query = paginate(query, int(page))
    location_list = []
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
    query = query_NPs()
    if page is not None:
        query = paginate(query, int(page))
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
    query = query_FMs()
    if page is not None:
        query = paginate(query, int(page))
    FM_list = []
    for FM in query:
        FM_schema = FMSchema()
        FM_dict = FM_schema.dump(FM)
        FM_list.append(FM_dict)
    response = jsonify({"instance_count" : len(FM_list), "data" : FM_list})
    return response

def paginate(query, page_num, page_size=PAGE_SIZE):
    return query.paginate(page=page_num, per_page=page_size, error_out=False).items

# Running app
if __name__ == '__main__':
	app.run(host="0.0.0.0", port=5000, debug = True)

