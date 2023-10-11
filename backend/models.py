from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

# Just need to change master password
app = Flask(__name__)
CORS(app)
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "mysql+pymysql://admin:Rural_Farm_Aid01@api-scrape-data.crn5q2iybxzv.us-east-1.rds.amazonaws.com:3306/api-scrape-data"
db = SQLAlchemy(app)

# Add Association tables

class Locations(db.Model):
    __tablename__ = "locations"
    
class FMs(db.Model):  
    __tablename__ = "something"

class NPs(db.Model):     
    __tablename__ = "something" 

    