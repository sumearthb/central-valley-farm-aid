import unittest
from app import app
from flask import Flask, jsonify
from schema import LocationSchema, FMSchema, NPSchema
from models import Locations, NPs, FMs, app
from sqlalchemy import create_engine, Column, Integer, String, Text, Double, Float
from sqlalchemy.engine import URL
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.dialects.postgresql import JSON
import json

Base = declarative_base()
engine = create_engine("sqlite:///:memory:")
Session = sessionmaker(bind=engine)

class mockLocationsTable(Base):
    __tablename__ = "location_data"
    
    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String(255))
    est = Column(Integer)
    area = Column(String(255))
    county_seat = Column(String(255))
    map = Column(String(255))
    population = Column(Integer)
    crops = Column(JSON)
    photo_references = Column(JSON)

class mockNPsTable(Base):
    __tablename__ = "charity_table"
      
    id                   = Column(Integer, primary_key=True, autoincrement=True)
    ein                  = Column(String(20), nullable=False)
    charityName          = Column(String(255), nullable=False)
    url                  = Column(String(255))
    donationUrl          = Column(String(255))
    city                 = Column(String(255))
    state                = Column(String(50))
    zipCode              = Column(String(20))
    start                = Column(Integer)
    category             = Column(String(255))
    eligibleCd           = Column(Integer)
    deductibilityCd      = Column(Integer)
    statusCd             = Column(Integer)
    website              = Column(String(255))
    missionStatement     = Column(Text)
    latitude             = Column(Double)
    longitude            = Column(Double)  
    photo_references     = Column(JSON)
    
class mockFMsTable(Base):
    __tablename__ = "farmers_market_table"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    listing_name         = Column(String(255))
    location_address     = Column(String(255))
    orgnization          = Column(String(255))
    listing_desc         = Column(String(255))
    location_x           = Column(Float)
    location_y           = Column(Float)
    location_desc        = Column(String(255))
    location_site        = Column(String(255))
    location_site_otherdesc            = Column(String(255))
    location_indoor      = Column(String(255))
    specialproductionmethods         = Column(String(255))
    fnap                 = Column(String(255))
    phone                = Column(String(20))
    photo_references     = Column(JSON)
    closest_charities    = Column(JSON)
    wheelchair_accessible = Column(String(20))
    rating               = Column(Float)
    website              = Column(String(255))
    

def get_all_locations(query):
    location_list = []
    for location in query:
        location_schema = LocationSchema()
        location_dict = location_schema.dump(location)
        location_list.append(location_dict)
    with app.app_context():
        response = jsonify({"instance_count" : len(location_list), "data" : location_list})
    return response

def get_all_nonprofits(query):
    NP_list = []
    for NP in query:
        NP_schema = NPSchema()
        NP_dict = NP_schema.dump(NP)
        NP_list.append(NP_dict)
    with app.app_context():
        response = jsonify({"instance_count" : len(NP_list), "data" : NP_list})
    return response

def get_all_markets(query):
    FM_list = []
    for FM in query:
        FM_schema = FMSchema()
        FM_dict = FM_schema.dump(FM)
        FM_list.append(FM_dict)
    with app.app_context():
        response = jsonify({"instance_count" : len(FM_list), "data" : FM_list})
    return response


class Tests(unittest.TestCase):
    
    def setUp(self):
        app.config["TESTING"] = True
        self.client = app.test_client()
        engine.dispose() 
        Base.metadata.create_all(engine)
        self.session = Session()
        photo_ref = {
            "photos": ["deidm"]
        }
        closest_char = {
            "char":["dijokde"]
        }
        crops_data = {
            "crops": {
                "crops": [
                "CABBAGE",
                "GARLIC",
                "BEANS",
                "CUCUMBERS",
                "MELONS",
                "ONIONS",
                "CARROTS",
                "PUMPKINS",
                "BROCCOLI",
                "LETTUCE",
                "ASPARAGUS",
                "TOMATOES",
                "SWEET CORN",
                "PEPPERS"
                ]
            }
        }
        self.valid_location = Locations(
            name = "fresno",
            county_seat = "fresno",
            est = "1990",
            population = 1,
            area = 0,
            map = "idejdiek",
            crops = crops_data,
            photo_references = photo_ref
        )
        self.valid_NP = NPs(
            ein = "ein",
            charityName = "cha",
            url = "https://hi",
            donationUrl = "https://donate",
            city = "Austin",
            state = "TX",
            zipCode = "78705",
            start = 2019,
            category = "Farmers' Market",
            eligibleCd = 1,
            deductibilityCd = 0,
            statusCd = 2,
            website = "https://hello",
            missionStatement = "We work",
            latitude = "-100.991",
            longitude = "1.9987",
            photo_references = photo_ref
        )
        self.valid_FM = FMs(
            listing_name = "Benica Certified Farmers Market",       
            location_address = "First Street between B & D Streets, Benicia, California 94510",     
            orgnization = "",          
            listing_desc = "",          
            location_x = "-122.16118",            
            location_y = "38.046215",           
            location_desc = "First Street Between B And D Streets",         
            location_site = "Closed-off public street;",         
            location_site_otherdesc = "",
            location_indoor = "No Indoor;",
            specialproductionmethods = "Organic (USDA Certified);",          
            fnap = "WIC;SNAP;Accept EBT at a central location;;",
            closest_charities = closest_char,
            wheelchair_accessible = "Sure",
            rating = 3.2,
            website = "dei"
        )

    def test_home(self):
        with self.client:
            response = self.client.get("/api")
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.data.decode("utf-8"), "Welcome to Central Valley Farm Aid!")

    def test_query_location(self):
        self.session.add(self.valid_location)
        self.session.commit()
        query = self.session.query(mockLocationsTable)
        self.assertIsNotNone(query)
        assert query.first().name == "fresno"
        crops_data = {
                "crops": {
                    "crops": [
                    "CABBAGE",
                    "GARLIC",
                    "BEANS",
                    "CUCUMBERS",
                    "MELONS",
                    "ONIONS",
                    "CARROTS",
                    "PUMPKINS",
                    "BROCCOLI",
                    "LETTUCE",
                    "ASPARAGUS",
                    "TOMATOES",
                    "SWEET CORN",
                    "PEPPERS"
                    ]
                }
            }
        crops_str = crops_data
        assert query.first().crops == crops_str
        assert query.first().map == "idejdiek"
        
    def test_query_NPs(self):
        self.session.add(self.valid_NP)
        self.session.commit()
        query = self.session.query(mockNPsTable)
        self.assertIsNotNone(query)
        assert query.first().start == 2019
        assert query.first().category == "Farmers' Market"
        assert query.first().longitude == 1.9987

    def test_query_FMs(self):
        self.session.add(self.valid_FM)
        self.session.commit()
        query = self.session.query(mockFMsTable)
        self.assertIsNotNone(query)
        assert query.first().listing_name == "Benica Certified Farmers Market"
        assert query.first().location_address == "First Street between B & D Streets, Benicia, California 94510"
        assert query.first().orgnization == ""

    def test_mock_get_all_locations(self):
        self.session.add(self.valid_location)
        self.session.commit()
        query = self.session.query(mockLocationsTable)
        self.assertIsNotNone(query)
        response = get_all_locations(query)
        self.assertIsNotNone(response)
        assert response.json["instance_count"] == 1
        
    def test_mock_get_all_nonprofits(self):
        self.session.add(self.valid_NP)
        self.session.commit()
        query = self.session.query(mockNPsTable)
        self.assertIsNotNone(query)
        response = get_all_nonprofits(query)
        self.assertIsNotNone(response)
        assert response.json["instance_count"] == 1
        
    def test_mock_get_all_markets(self):
        self.session.add(self.valid_FM)
        self.session.commit()
        query = self.session.query(mockFMsTable)
        self.assertIsNotNone(query)
        response = get_all_markets(query)
        self.assertIsNotNone(response)
        assert response.json["instance_count"] == 1    

    def test_get_all_locations(self):
        with self.client:
            response = self.client.get("/api/GetAllLocations")
            self.assertEqual(response.status_code, 200)
            data = response.json["data"]
            self.assertIsNotNone(data)
            self.assertEqual(response.json["instance_count"], 58)

    def test_get_location_by_name(self):
        with self.client:
            response = self.client.get("/api/GetLocations/Yolo")
            self.assertEqual(response.status_code, 200)
            data = response.json
            self.assertIsNotNone(data)
            self.assertEqual(data["data"][0]["name"], "Yolo")

    def test_get_all_NPs(self):
        with self.client:
            response = self.client.get("/api/GetAllNonProfit")
            self.assertEqual(response.status_code, 200)
            data = response.json["data"]
            self.assertIsNotNone(data)
            self.assertEqual(response.json["instance_count"], 129)
    
    def test_get_NP_by_name(self):
        with self.client:
            response = self.client.get("/api/GetNonProfit/DEL MAR FARMERS MARKET")
            self.assertEqual(response.status_code, 200)
            data = response.json
            self.assertIsNotNone(data)
            self.assertEqual(data["data"][0]["charityName"], "DEL MAR FARMERS MARKET")
    
    def test_get_all_FMs(self):
        with self.client:
            response = self.client.get("/api/GetAllMarkets")
            self.assertEqual(response.status_code, 200)
            data = response.json["data"]
            self.assertIsNotNone(data)
            self.assertEqual(response.json["instance_count"], 107)

    def test_get_FM_by_id(self):
        with self.client:
            response = self.client.get("/api/GetMarket/Claremont Farmers & Artisans Market")
            self.assertEqual(response.status_code, 200)
            data = response.json
            self.assertIsNotNone(data)
            self.assertEqual(data["data"][0]["listing_name"], "Claremont Farmers & Artisans Market")
    
    def test_get_all_locations_pagination(self):
        with self.client:
            response = self.client.get("/api/GetAllLocations?page=1&per_page=9")
            self.assertEqual(response.status_code, 200)
            data = response.json["data"]
            self.assertEqual(len(data), 9)

    def test_get_all_nonprofit_pagination(self):
        with self.client:
            response = self.client.get("/api/GetAllNonProfit?page=1&per_page=9")
            self.assertEqual(response.status_code, 200)
            data = response.json["data"]
            self.assertEqual(len(data), 9)

    def test_get_all_markets_pagination(self):
        with self.client:
            response = self.client.get("/api/GetAllMarkets?page=1&per_page=9")
            self.assertEqual(response.status_code, 200)
            data = response.json["data"]
            self.assertEqual(len(data), 9)
    
    def test_get_num_locations(self):
        with self.client:
            response = self.client.get("/api/GetNumLocations")
            self.assertEqual(response.status_code, 200)
            resp = response.json
            count = resp["count"]
            self.assertEqual(count, 58)

    def test_get_num_nonprofits(self):
        with self.client:
            response = self.client.get("/api/GetNumNonProfits")
            self.assertEqual(response.status_code, 200)
            resp = response.json
            count = resp["count"]
            self.assertEqual(count, 129)

    def test_get_num_markets(self):
        with self.client:
            response = self.client.get("/api/GetNumMarkets")
            self.assertEqual(response.status_code, 200)
            resp = response.json
            count = resp["count"]
            self.assertEqual(count, 107)
    
    def teardown_class(self):
        Base.metadata.drop_all(engine)
        self.session.rollback()
        self.session.close()


if __name__ == '__main__':
    unittest.main()    