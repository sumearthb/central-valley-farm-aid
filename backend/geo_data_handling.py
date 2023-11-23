import googlemaps
import json

gmaps = googlemaps.Client(key='AIzaSyBMJJbFxLfnX8DpE_BGF2dF8t5aWSQJOOs')

def googleAPILocation(data):
    for obj in data:
        # Default Value
        photo_references = []

        # Call Google API
        find_place = gmaps.find_place(
            obj["county_name"] + " County, CA",
            "textquery",
            fields=["photos"]) # This is the different fields you can get from a place, for locations we only want photos

        # Add data if exists
        if (len(find_place["candidates"]) > 0):
            photo_references = []
            photos = find_place["candidates"][0].get("photos", [])
            for photo in photos:
                photo_references.append(photo["photo_reference"])

        obj["photo_references"] = json.dumps({"photos" : photo_references})

def googleAPINonProfit (data):
    for obj in data:
        #Default Value
        photo_references = []
        bias_string = "circle:1000000@{},{}".format(obj.get("latitude", 37.2917), obj.get("longitude", -119.9789))
        # Call Google API
        find_place = gmaps.find_place(
            obj["charityName"] + " nonprofit",
            "textquery",
            location_bias = bias_string,
            fields=["photos"]) # This is the different fields u can get from a place, for locations we only want photos

        # Add data if exists
        if (len(find_place["candidates"]) > 0):
            photo_references = []
            photos = find_place["candidates"][0].get("photos", [])
            for photo in photos:
                photo_references.append(photo["photo_reference"])
        
        obj["photo_references"] = json.dumps({"photos" : photo_references})

def googleAPIFarmersMarkets (data):
    data_dict = {"website": [], "phone": [], "rating": [], "wheelchair_accessible": [], "photo_references": []}
    # Pandas dataframe
    # 2d list of[[websites], [phoneNumbers], [ratings], [photos]]
    for index, row in data.iterrows():
        #Default Values
        website = ""
        phone = ""
        rating = 0
        wheelchair_accessible = False
        photo_references = []

        # Call Google API
        bias_string = "circle:3000@{},{}".format(row["location_y"], row["location_x"])
        find_place = gmaps.find_place(
            row["listing_name"],
            "textquery",
            location_bias=bias_string,
            fields=["place_id"]) # Get the place_id because google API is stupid
        places: list = find_place['candidates']

        # Add data if exists
        if (len(places) > 0):
            place_id = places[0]["place_id"]

            place_dict: dict = gmaps.place(place_id)["result"]

            website = place_dict.get("website", "")
            phone = place_dict.get("formatted_phone_number", "")
            rating = place_dict.get("rating")
            wheelchair_accessible = place_dict.get("wheelchair_accessible_entrance", False)
            photos = place_dict.get("photos", [])
            for photo in photos:
                photo_references.append(photo["photo_reference"])

        data_dict["website"].append(website)
        data_dict["phone"].append(phone)
        data_dict["rating"].append(rating)
        data_dict["wheelchair_accessible"].append(str(wheelchair_accessible))
        data_dict["photo_references"].append(json.dumps(photo_references))
        
    return data_dict