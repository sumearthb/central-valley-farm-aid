# Import flask and datetime module for showing date and time
from flask import Flask
import datetime

x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)


# Route for seeing a data
@app.route('/')
def home():

	return "Rural Farm Aid"

	
# Running app
if __name__ == '__main__':
	app.run(host="0.0.0.0", port=5000)
