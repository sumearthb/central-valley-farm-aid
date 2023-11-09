# Import flask and datetime module for showing date and time
from flask import Flask, request, jsonify, Response
from models import Locations, NPs, FMs, app, db
from schema import LocationSchema, NPSchema, FMSchema
from flask_cors import CORS
from sqlalchemy import or_, func, cast, and_, Integer, case, literal, select, text, desc, func
from sqlalchemy.sql.expression import asc, desc
from sqlalchemy.orm import aliased
from sqlalchemy.dialects.mysql import match, JSON
import googlemaps
import json

gmaps = googlemaps.Client(key='AIzaSyBMJJbFxLfnX8DpE_BGF2dF8t5aWSQJOOs')

# size for each page -- pagination
PER_PAGE = 9

@app.route('/api')
def home():
	return "Welcome to Central Valley Farm Aid!" 

# @app.route('/api/SearchAll', methods = ['GET'])
# def search_all():
#     search = request.args.get("search", type=str, default=None)
#     if not search:
#         return jsonify({"error": "A search query is required."}), 400

#     search_terms = search.split()
#     query_locations = search_locations(search_terms)
#     query_NPs = search_NPs(search_terms)
#     query_FMs = search_FMs(search_terms)
#     location_list = []
#     for location in query_locations:
#         location_Schema = LocationSchema()
#         location_dict = location_Schema.dump(location)
#         location_list.append(location_dict)
#     NP_list = []
#     for NP in query_NPs:
#         NP_Schema = NPSchema()
#         NP_dict = NP_Schema.dump(NP)
#         NP_list.append(NP_dict)
#     FM_list = []
#     for FM in query_FMs:
#         FM_Schema = FMSchema()
#         FM_dict = FM_Schema.dump(FM)
#         FM_list.append(FM_dict)
#     response = jsonify({"locations" : location_list, "NPs" : NP_list, "FMs" : FM_list})
#     return response
    
# Search for locations using the provided search terms
def search_locations(search_terms):
    query = db.session.query(Locations)
    
    search_terms_arr = search_terms.split(",") if search_terms else []

    # Set up search conditions 
    search_conditions = [Locations.name.ilike(f"%{term}%") for term in search_terms_arr]
    search_conditions += [Locations.county_seat.ilike(f"%{term}%") for term in search_terms_arr]
    search_conditions += [Locations.crops.ilike(f"%{term}%") for term in search_terms_arr]
   
    query = query.filter(or_(*search_conditions))

    # SEARCH relevance sorting
    # Perform search using FULLTEXT index of charities
    indexed_cols = [Locations.name, Locations.county_seat, Locations.crops_str]
    # Construct MATCH...AGAINST SQL expression (using the already created FULLTEXT index)
    match_expression = match(
        *indexed_cols,
        against = search_terms,
        in_natural_language_mode = True
    )
    # Search for relevant charities using MATCH...AGAINST expression and sort by descending relevance
    query = query.order_by(match_expression.desc())
    #query = query.order_by(match_expression.desc())
    
    return query

# Search for NPs using the provided search terms
def search_NPs(search_terms):
    query = db.session.query(NPs)
    
    search_terms_arr = search_terms.split(",") if search_terms else []
    
    search_conditions = [NPs.charityName.ilike(f"%{term}%") for term in search_terms_arr]
    search_conditions += [NPs.state.ilike(f"%{term}%") for term in search_terms_arr]
    search_conditions += [NPs.city.ilike(f"%{term}%") for term in search_terms_arr]
    search_conditions += [NPs.zipCode.ilike(f"%{term}%") for term in search_terms_arr]
    search_conditions += [NPs.category.ilike(f"%{term}%") for term in search_terms_arr]
    query = query.filter(or_(*search_conditions))

    # SEARCH relevance sorting
    # Perform search using FULLTEXT index of charities
    indexed_cols = [NPs.charityName, NPs.state, NPs.city, NPs.zipCode, NPs.category]
    # Construct MATCH...AGAINST SQL expression (using the already created FULLTEXT index)
    match_expression = match(
        *indexed_cols,
        against = search_terms,
        in_natural_language_mode = True
    )

    # Search for relevant charities using MATCH...AGAINST expression and sort by descending relevance
    query = query.order_by(match_expression.desc())
    #query = query.order_by(match_expression.desc())
    
    return query

# Search for FMs using the provided search terms
def search_FMs(search_terms):
    query = db.session.query(FMs)

    search_terms_arr = search_terms.split(",") if search_terms else []
    
    search_conditions = [FMs.listing_name.ilike(f"%{term}%") for term in search_terms_arr]
    search_conditions += [FMs.listing_desc.ilike(f"%{term}%") for term in search_terms_arr]
    search_conditions += [FMs.location_address.ilike(f"%{term}%") for term in search_terms_arr]
    search_conditions += [FMs.location_desc.ilike(f"%{term}%") for term in search_terms_arr]
    search_conditions += [FMs.specialproductionmethods.ilike(f"%{term}%") for term in search_terms_arr]
    search_conditions += [FMs.fnap.ilike(f"%{term}%") for term in search_terms_arr]
    query = query.filter(or_(*search_conditions))

    # SEARCH relevance sorting
    # Perform search using FULLTEXT index of charities
    indexed_cols = [FMs.listing_name, FMs.location_address]
    # Construct MATCH...AGAINST SQL expression (using the already created FULLTEXT index)
    match_expression = match(
        *indexed_cols,
        against = search_terms,
        in_natural_language_mode = True
    )
    # Search for relevant charities using MATCH...AGAINST expression and sort by descending relevance
    query = query.order_by(match_expression.desc())
    #query = query.order_by(match_expression.desc())
    
    return query

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
    search_terms = request.args.get("search")
    if search_terms:    # search_locations triggered only if search_terms isn't empty
        query = search_locations(search_terms)
    
    # Filtering for locations
    crop = request.args.get("crop", type=str, default=None)
    if crop:
        query = query.filter(Locations.crops_str.ilike(f"%{crop}%"))
    est = request.args.get("est", type=int)
    if est:
        query = query.filter(Locations.est == est)

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
    elif sort_by == "num_crops":
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
    
    print(query)

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

    # Searching for locations
    search_terms = request.args.get("search")
    if search_terms:    # search_locations triggered only if search_terms isn't empty
        query = search_NPs(search_terms)

    # Filtering for NPs
    category = request.args.get("category", type=str, default=None)
    if category:
        query = query.filter(NPs.category == category)  
    has_mission = request.args.get("mission", type=str, default=None)
    if has_mission:
        query = query.filter(NPs.missionStatement == has_mission)  
    
    # Sorting for NPs
    sort_by = request.args.get("sort_by", type=str, default="asc")
    sort_order = request.args.get("sort_order", type=str, default="asc")
    if sort_by == "name":
        if sort_order == "asc":
            query = query.order_by(asc(NPs.charityName))
        elif sort_order == "desc":
            query = query.order_by(desc(NPs.charityName))
    elif sort_by == "ein":
        if sort_order == "asc":
            query = query.order_by(asc(NPs.ein))
        elif sort_order == "desc":
            query = query.order_by(desc(NPs.ein))
    elif sort_by == "city":
        if sort_order == "asc":
            query = query.order_by(asc(NPs.city))
        elif sort_order == "desc":
            query = query.order_by(desc(NPs.city))

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

    # Searching for markets
    search_terms = request.args.get("search")
    if search_terms:    # search_locations triggered only if search_terms isn't empty
        query = search_FMs(search_terms)

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
	app.run(host="0.0.0.0", port=4997, debug = True)

