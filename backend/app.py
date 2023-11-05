# Import flask and datetime module for showing date and time
from flask import Flask, request, jsonify, Response
from models import Locations, NPs, FMs, app, db
from schema import LocationSchema, NPSchema, FMSchema
from flask_cors import CORS
from sqlalchemy import or_, func, cast, and_, Integer
from sqlalchemy.sql.expression import asc, desc
import googlemaps
import json

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
    
    # Searching for locations
    search = request.args.get("search")
    search_terms = search.split() if search else []
    search_conditions = [
        or_(
            Locations.name.ilike(f"%{term}%"),
            Locations.county_seat.ilike(f"%{term}%"),
            Locations.crops.ilike(f"%{term}%")
        )
        for term in search_terms
    ]
    if search_conditions:
        query = query.filter(or_(*search_conditions))
    
    # Sorting for locations
    sort_by = request.args.get("sort_by", type=str, default="name")
    sort_order = request.args.get("sort_order", type=str, default="asc")
    
    if sort_by == "name":
        if sort_order == "asc":
            query = query.order_by(asc(Locations.name))
        elif sort_order == "desc":
            query = query.order_by(desc(Locations.name))
    elif sort_by == "county_seat":
        if sort_order == "asc":
            query = query.order_by(asc(Locations.county_seat))
        elif sort_order == "desc":
            query = query.order_by(desc(Locations.county_seat))
    elif sort_by == "crops":
        if sort_order == "asc":
            query = query.order_by(asc(Locations.crops['crops']))
        elif sort_order == "desc":
            query = query.order_by(desc(Locations.crops['crops']))
    elif sort_by == "area":
        if sort_order == "asc":
            query = query.order_by(cast(Locations.area, Integer))
        elif sort_order == "desc":
            query = query.order_by(desc(cast(Locations.area, Integer)))
    elif sort_by == "population":
        if sort_order == "asc":
            query = query.order_by(Locations.population.asc())
        elif sort_order == "desc":
            query = query.order_by(Locations.population.desc())
    
    if page is not None:
        query = paginate(query, int(page), int(per_page))
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
    per_page = request.args.get("per_page")
    query = db.session.query(NPs)

    # Searching for NPs
    search = request.args.get('search')
    search_terms = search.split() if search else []
    search_conditions = [
        or_(
            NPs.charityName.ilike(f"%{term}%"),
            NPs.state.ilike(f"%{term}%"),
            NPs.city.ilike(f"%{term}%"),
            NPs.zipCode.ilike(f"%{term}%"),
            NPs.category.ilike(f"%{term}%"),
            NPs.missionStatement.ilike(f"%{term}%")
        )
        for term in search_terms
    ]
    if search_conditions:
        query = query.filter(or_(*search_conditions))

    # Filtering for NPs
    city = request.args.get("city", type=str, default=None)
    if city:
        query = query.filter(NPs.city == city)
        city = request.args.get("city", type=str, default=None)
    category = request.args.get("category", type=str, default=None)
    if category:
        query = query.filter(NPs.category == category)  
    has_mission = request.args.get("mission", type=str, default=None)
    if category:
        query = query.filter(NPs.missionStatement == has_mission)  
    
    # Sorting for NPs
    sort_by = request.args.get("sort_by", type=str, default="asc")
    sort_order = request.args.get("sort_order", type=str, default="asc")
    if sort_by == "name":
        if sort_order == "asc":
            query = query.order_by(asc(NPs.charityName))
        elif sort_order == "desc":
            query = query.order_by(desc(NPs.charityName))
    elif sort_by == "statusCd":
        if sort_order == "asc":
            query = query.order_by(asc(NPs.statusCd))
        elif sort_order == "desc":
            query = query.order_by(desc(NPs.statusCd))

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

    # Searching for FMs
    search = request.args.get("search")
    search_terms = search.split() if search else []
    search_conditions = [
        or_(
            FMs.listing_name.ilike(f"%{term}%"),
            FMs.listing_desc.ilike(f"%{term}%"),
            FMs.location_address.ilike(f"%{term}%"),
            FMs.location_desc.ilike(f"%{term}%"),
            FMs.specialproductionmethods.ilike(f"%{term}%"),
            FMs.fnap.ilike(f"%{term}%")
        )
        for term in search_terms
    ]
    if search_conditions:
        query = query.filter(or_(*search_conditions))

    # Filtering for FMs
    wheelchair_accessible = request.args.get("wheelchair_accessible", type=str, default=None)
    if wheelchair_accessible:
        query = query.filter(FMs.wheelchair_accessible == wheelchair_accessible)
    indoor = request.args.get("indoor_status", type=str, default=None)
    if indoor:
        query = query.filter(FMs.location_indoor != "No Indoor;")
        query = query.filter(FMs.location_indoor != "No;")
        query = query.filter(FMs.location_indoor != "0")
    fnap_access = request.args.get("fnap", type=str, default=None)
    if fnap_access:
        query = query.filter(FMs.fnap != "None")

    # Sorting for FMs
    sort_by = request.args.get("sort_by", type=str, default="asc")
    sort_order = request.args.get("sort_order", type=str, default="asc")
    if sort_by == "name":
        if sort_order == "asc":
            query = query.order_by(asc(FMs.listing_name))
        elif sort_order == "desc":
            query = query.order_by(desc(FMs.listing_name))
    elif sort_by == "rating":
        if sort_order == "asc":
            query = query.order_by(asc(FMs.rating))
        elif sort_order == "desc":
            query = query.order_by(desc(FMs.rating))
    
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

