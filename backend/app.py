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

def get_all_locations():
    query = db.session.query(Locations)
    return query

def get_all_NPs():
    query = db.session.query(NPs)
    return query

def get_all_FMs():
    query = db.session.query(FMs)
    return query

@app.route("/api/Locations")
def get_locations():
    query = get_all_locations()
    location_list = []
    for location in query:
        location_dict = {}
        location_list.append(location_dict)
    response = jsonify({"instance_count" : len(location_list), "locations" : location_list})
    return response

@app.route("/api/NPs")
def get_NPs():
    query = get_all_NPs()
    NP_list = []
    for NP in query:
        NP_dict = {}
        NP_list.append(NP_dict)
    response = jsonify({"instance_count" : len(NP_list), "locations" : NP_list})
    return response 

@app.route("/api/FMs")
def get_FMs():
    query = get_all_FMs()
    FM_list = []
    for FM in query:
        FM_dict = {}
        FM_list.append(FM_dict)
    response = jsonify({"instance_count" : len(FM_list), "locations" : FM_list})
    return response

# Running app
if __name__ == '__main__':
	app.run(host="0.0.0.0", port=5000, debug = True)

