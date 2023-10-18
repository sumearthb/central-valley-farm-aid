import unittest
from app import app
from flask import Flask, jsonify
from schema import LocationSchema, FMSchema, NPSchema
from models import Locations, NPs, FMs
from sqlalchemy import create_engine, Column, Integer, String, Text, Double
from sqlalchemy.engine import URL
from sqlalchemy.orm import sessionmaker, declarative_base

test = Flask(__name__)

Base = declarative_base()
engine = create_engine("sqlite:///:memory:")
Session = sessionmaker(bind=engine)

class mockLocationsTable(Base):
    __tablename__ = "crop_table"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    country_name         = Column(String(255))
    county_name          = Column(String(255))
    statisticcat_desc    = Column(String(255))
    location_desc        = Column(String(255))
    asd_code             = Column(String(10))
    begin_code           = Column(String(10))
    group_desc           = Column(String(255))
    agg_level_desc       = Column(String(255))
    commodity_desc       = Column(String(255))
    prodn_practice_desc  = Column(String(255))
    state_name           = Column(String(255))
    state_ansi           = Column(String(10))
    sector_desc          = Column(String(255))
    source_desc          = Column(String(255))
    year                 = Column(Integer)
    domaincat_desc       = Column(String(255))
    state_alpha          = Column(String(2))
    short_desc           = Column(String(255))
    util_practice_desc   = Column(String(255))
    asd_desc             = Column(String(255))

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
    rows                 = Column(Integer)
    recordCount          = Column(Integer)
    score                = Column(Integer)
    acceptingDonations   = Column(Integer)
    category             = Column(String(255))
    eligibleCd           = Column(Integer)
    deductibilityCd      = Column(Integer)
    statusCd             = Column(Integer)
    website              = Column(String(255))
    missionStatement     = Column(Text)
    parent_ein           = Column(String(20))
    latitude             = Column(Double)
    longitude            = Column(Double)
    
class mockFMsTable(Base):
    __tablename__ = "your_table_name"

    id = Column(Integer, primary_key=True, autoincrement=True)
    listing_name         = Column(String(255))
    location_address     = Column(String(255))
    orgnization          = Column(String(255))
    listing_desc         = Column(Text)
    location_x           = Column(Integer)
    location_y           = Column(Integer)
    location_desc        = Column(Text)
    location_site        = Column(Text)
    otherdesc            = Column(Text)
    location_indoor      = Column(Text)
    prod_methods         = Column(Text)
    fnap                 = Column(Text)
    

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
        test.config["TESTING"] = True
        self.client = test.test_client()
        Base.metadata.create_all(engine)
        self.session = Session()
        self.valid_location = Locations(
            country_name = "usa",
            county_name = "fresno",
            statisticcat_desc = "desc",
            location_desc = "hi",
            asd_code = "code",
            begin_code = "begin",
            group_desc = "group",
            agg_level_desc = "agg",
            commodity_desc = "comm",
            prodn_practice_desc = "prodn",
            state_name = "state",
            state_ansi = "ansi",
            sector_desc = "sector",
            source_desc = "source",
            year = 1000,
            domaincat_desc = "domain",
            state_alpha = "alpha",
            short_desc = "short",
            util_practice_desc = "util",
            asd_desc = "asd"
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
            longitude = "1.9987"
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
            otherdesc = "",
            location_indoor = "No Indoor;",
            prod_methods = "Organic (USDA Certified);",          
            fnap = "WIC;SNAP;Accept EBT at a central location;;"
        )

    def test_query_location(self):
        self.session.add(self.valid_location)
        self.session.commit()
        query = self.session.query(mockLocationsTable)
        self.assertIsNotNone(query)
        assert query.first().county_name == "fresno"
        assert query.first().source_desc == "source"
        assert query.first().asd_desc == "asd"
        
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

    def test_get_all_locations(self):
        self.session.add(self.valid_location)
        self.session.commit()
        query = self.session.query(mockLocationsTable)
        self.assertIsNotNone(query)
        response = get_all_locations(query)
        self.assertIsNotNone(response)
        assert response.json["instance_count"] == 1
        
    def test_get_all_nonprofits(self):
        self.session.add(self.valid_NP)
        self.session.commit()
        query = self.session.query(mockNPsTable)
        self.assertIsNotNone(query)
        response = get_all_nonprofits(query)
        self.assertIsNotNone(response)
        assert response.json["instance_count"] == 1
        
    def test_get_all_markets(self):
        self.session.add(self.valid_FM)
        self.session.commit()
        query = self.session.query(mockFMsTable)
        self.assertIsNotNone(query)
        response = get_all_markets(query)
        self.assertIsNotNone(response)
        assert response.json["instance_count"] == 1    
        
    # def test_search_all(self):
    #     pass
        
    # def test_get_location(self):
    #     pass

    # def test_get_all_locations(self):
    #     with self.client:
    #         response = self.client.get("/api/GetAllLocations")
    #         self.assertEqual(response.status_code, 200)
    #         data = response.json["data"]
    #         self.assertIsNotNone(data)
    #         # TODO ~ change assert value to actual expected instance count
    #         self.assertEqual(response.json["instance_count"], len(data))

    # def test_get_location_by_id(self):
    #     response = self.app.get("/api/GetLocation/x")
    #     self.assertEqual(response.status_code, 200)
    #     data = response.json
    #     self.assertIsNotNone(data)
    #     self.assertEqual(data["id"], "x")

    # def test_get_NP(self):
    #     pass   

    # def test_get_all_NPs(self):
    #     with self.client:
    #         response = self.client.get("/api/GetAllNonprofit")
    #         self.assertEqual(response.status_code, 200)
    #         data = response.json["data"]
    #         self.assertIsNotNone(data)
    #         # TODO ~ change assert value to actual expected instance count
    #         self.assertEqual(response.json["instance_count"], len(data))
    
    # def test_get_NP_by_id(self):
    #     response = self.app.get("/api/GetNonProfit/x")
    #     self.assertEqual(response.status_code, 200)
    #     data = response.json
    #     self.assertIsNotNone(data)
    #     self.assertEqual(data["id"], "x")
        
    # def test_get_FM(self):
    #     pass
    
    # def test_get_all_FMs(self):
    #     with self.client:
    #         response = self.client.get("/api/GetAllMarkets")
    #         self.assertEqual(response.status_code, 200)
    #         data = response.json["data"]
    #         self.assertIsNotNone(data)
    #         # TODO ~ change assert value to actual expected instance count
    #         self.assertEqual(response.json["instance_count"], len(data))

    # def test_get_FM_by_id(self):
    #     response = self.app.get("/api/GetMarket/x")
    #     self.assertEqual(response.status_code, 200)
    #     data = response.json
    #     self.assertIsNotNone(data)
    #     self.assertEqual(data["id"], "x")
    
    def teardown_class(self):
        self.session.rollback()
        self.session.close()


if __name__ == '__main__':
    unittest.main()    