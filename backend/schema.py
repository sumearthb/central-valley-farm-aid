from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from models import Locations, FMs, NPs

ma = Marshmallow()

# these classes are used to serialize the models from SQLAlchemy
# (i.e. take the models and convert them into JSON formatting)
class LocationSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Locations

class FMSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = FMs

class NPSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = NPs

locationSchema = LocationSchema()
fmSchema = FMSchema()
npSchema = NPSchema()