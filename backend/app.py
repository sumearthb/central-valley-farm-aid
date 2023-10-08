# Import flask and datetime module for showing date and time
from flask import Flask, request, jsonify, Response
import datetime
from models import Animal, State, Park, app, db
from schema import AnimalSchema, ParkSchema, StateSchema
from flask_cors import CORS
import json
from sqlalchemy import or_, func, and_, Integer
from sqlalchemy.sql.expression import asc, desc


# python app.py to run dev server
# Flask handles incoming HTTP req, uses SQLAlch to interact with database, then
# marshmallow schemas to format data before sending it as json response to clients

x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)


# Route for seeing a data
@app.route('/')
def home():
	return "Rural Farm Aid" 

def get_all_locations():
    
    return query

def get_all_NPs():
     
    return query

def get_all_FMs():
     
    return query

@app.route("/api/Locations")
def get_locations():
    query = get_all_locations()
    res = []
    for location in query:

    response = jsonify({"instance_count" : count})
    return response

@app.route("/api/NPs")
def get_NPs():
    query = get_all_NPs()
    res = []
    for location in query:

    response = jsonify({"instance_count" : count})
    return response 

@app.route("/api/FMs")
def get_FMs():
    query = get_all_FMs()
    res = []
    for location in query:

    response = jsonify({"instance_count" : count})
    return response

# Running app
if __name__ == '__main__':
	app.run(host="0.0.0.0", port=5000, debug = True)

