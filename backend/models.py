from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "mysql+pymysql://admin:Central_Valley1@database-1.cnowuhjix5ja.us-west-1.rds.amazonaws.com:3306/api_scraping"
db = SQLAlchemy(app)

class Locations(db.Model):
    __tablename__ = "crop_table"
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    country_name         = db.Column(db.String(255))
    county_name          = db.Column(db.String(255))
    statisticcat_desc    = db.Column(db.String(255))
    location_desc        = db.Column(db.String(255))
    asd_code             = db.Column(db.String(10))
    begin_code           = db.Column(db.String(10))
    group_desc           = db.Column(db.String(255))
    agg_level_desc       = db.Column(db.String(255))
    commodity_desc       = db.Column(db.String(255))
    prodn_practice_desc  = db.Column(db.String(255))
    state_name           = db.Column(db.String(255))
    state_ansi           = db.Column(db.String(10))
    sector_desc          = db.Column(db.String(255))
    source_desc          = db.Column(db.String(255))
    year                 = db.Column(db.Integer)
    domaincat_desc       = db.Column(db.String(255))
    state_alpha          = db.Column(db.String(2))
    short_desc           = db.Column(db.String(255))
    util_practice_desc   = db.Column(db.String(255))
    asd_desc             = db.Column(db.String(255))
    
    def __repr__(self):
        return f"Location ('{self.county_name}')"
    
class FMs(db.Model):  
    __tablename__ = "your_table_name"
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    listing_name         = db.Column(db.String(255))
    location_address     = db.Column(db.String(255))
    orgnization          = db.Column(db.String(255))
    listing_desc         = db.Column(db.Text)
    location_x           = db.Column(db.Integer)
    location_y           = db.Column(db.Integer)
    location_desc        = db.Column(db.Text)
    location_site        = db.Column(db.Text)
    otherdesc            = db.Column(db.Text)
    location_indoor      = db.Column(db.Text)
    prod_methods         = db.Column(db.Text)
    fnap                 = db.Column(db.Text)
    
    def __repr__(self):
        return f"Farmers' Market ('{self.listing_name}')"

class NPs(db.Model):   
    __tablename__ = "charity_table"
      
    id                   = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ein                  = db.Column(db.String(20), nullable=False)
    charityName          = db.Column(db.String(255), nullable=False)
    url                  = db.Column(db.String(255))
    donationUrl          = db.Column(db.String(255))
    city                 = db.Column(db.String(255))
    state                = db.Column(db.String(50))
    zipCode              = db.Column(db.String(20))
    start                = db.Column(db.Integer)
    category             = db.Column(db.String(255))
    eligibleCd           = db.Column(db.Integer)
    deductibilityCd      = db.Column(db.Integer)
    statusCd             = db.Column(db.Integer)
    website              = db.Column(db.String(255))
    missionStatement     = db.Column(db.Text)
    latitude             = db.Column(db.Double)
    longitude            = db.Column(db.Double) 
    
    def __repr__(self):
        return f"Nonprofit ('{self.charityName}')"
    