# Import flask and datetime module for showing date and time
from flask import Flask
import datetime

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

@app.route("/Locations")
def getLocations():
    return 

@app.route("/NPs")
def getNPs():
    return 

@app.route("/FMs")
def getFMs():
    return 
# Running app
if __name__ == '__main__':
	app.run(host="0.0.0.0", port=5000, debug = True)

