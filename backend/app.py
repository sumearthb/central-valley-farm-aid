# Import flask and datetime module for showing date and time
from flask import Flask, request, jsonify, Response
import datetime
from models import Locations, NPs, FMs, app, db
from schema import LocationSchema, NPSchema, FMSchema
from flask_cors import CORS
import json
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

def query_locations(mode):
    query = db.session.query(Locations)
    return query

def query_NPs(mode):
    query = db.session.query(NPs)
    return query

def query_FMs(mode):
    query = db.session.query(FMs)
    return query

# TODO ~ phase 3
@app.route("/api/GetLocations")
def get_locations():
    query = query_locations(1)
    location_list = []
    for location in query:
        location_dict = {}
        location_list.append(location_dict)
    response = jsonify({"instance_count" : len(location_list), "data" : location_list})
    return response

@app.route("/api/GetAllLocations")
def get_all_locations():
    query = query_locations(0)
    location_list = []
    for location in query:
        location_dict = LocationSchema.dump(location)
        location_list.append(location_dict)
    response = jsonify({"instance_count" : len(location_list), "data" : location_list})
    return response

# TODO ~ phase 3
@app.route("/api/GetNonProfit")
def get_nonprofit():
    query = query_NPs(1)
    NP_list = []
    for NP in query:
        NP_dict = {}
        NP_list.append(NP_dict)
    response = jsonify({"instance_count" : len(NP_list), "data" : NP_list})
    return response 

@app.route("/api/GetAllNonProfit")
def get_all_nonprofits():
    query = query_NPs(0)
    NP_list = []
    for NP in query:
        NP_dict = NPSchema.dump(NP)
        NP_list.append(NP_dict)
    response = jsonify({"instance_count" : len(NP_list), "data" : NP_list})
    return response 

# TODO ~ phase 3
@app.route("/api/GetMarket")
def get_market():
    query = query_FMs(1)
    FM_list = []
    for FM in query:
        FM_dict = {}
        FM_list.append(FM_dict)
    response = jsonify({"instance_count" : len(FM_list), "data" : FM_list})
    return response

@app.route("/api/GetAllMarkets")
def get_all_markets():
    query = query_FMs(0)
    FM_list = []
    for FM in query:
        FM_dict = FMSchema.dump(FM)
        FM_list.append(FM_dict)
    response = jsonify({"instance_count" : len(FM_list), "data" : FM_list})
    return response

# Running app
if __name__ == '__main__':
	app.run(host="0.0.0.0", port=5000, debug = True)

