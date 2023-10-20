from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import JSON

app = Flask(__name__)
CORS(app)
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "mysql+pymysql://admin:Central_Valley1@database-1.cnowuhjix5ja.us-west-1.rds.amazonaws.com:3306/api_scraping"
db = SQLAlchemy(app)

class Locations(db.Model):
    __tablename__ = "location_table"
    
    location = db.Column(db.String(255), primary_key=True, nullable=False)
    crops = db.Column(JSON, nullable=True)
    
class FMs(db.Model):  
    __tablename__ = "farmers_market_table"
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    listing_name         = db.Column(db.String(255))
    location_address     = db.Column(db.String(255))
    orgnization          = db.Column(db.String(255))
    listing_desc         = db.Column(db.String(255))
    location_x           = db.Column(db.Float)
    location_y           = db.Column(db.Float)
    location_desc        = db.Column(db.String(255))
    location_site        = db.Column(db.String(255))
    location_site_otherdesc            = db.Column(db.String(255))
    location_indoor      = db.Column(db.String(255))
    specialproductionmethods         = db.Column(db.String(255))
    fnap                 = db.Column(db.String(255))

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