from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "mysql+pymysql://admin:020402020402@idb7-db.cyvindjupys7.us-east-2.rds.amazonaws.com:3306/idb7"
db = SQLAlchemy(app)

class Locations(db.Model):
    
class FMs(db.Model):  
    __tablename__ = "something"

class NPs(db.Model):     
    __tablename__ = "something" 

    