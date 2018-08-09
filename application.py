from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import BigInteger, Boolean, Column
from sqlalchemy import DateTime, Float, String, Text
from sqlalchemy.ext.declarative import declarative_base
import os, csv, datetime

app = application = Flask(__name__)

app.config.from_object(__name__)

# Add database configurations which are set in
# the EBS environment
if ('RDS_HOSTNAME' in os.environ):
    app.config.update(dict(
        ENGINE='postgresql',
        NAME=os.environ['RDS_DB_NAME'],
        USER=os.environ['RDS_USERNAME'],
        PASSWORD=os.environ['RDS_PASSWORD'],
        HOST=os.environ['RDS_HOSTNAME'],
        PORT=os.environ['RDS_PORT'],
    ))
else:
    # This means we are in local development and so all database
    # information should be in a file called db.csv
    dbDict = {}
    with open('db.csv', 'r') as csvfile:
        dbReader = csv.reader(csvfile, delimiter=' ', quotechar='|')
        for row in dbReader:
            dbDict[row[0]] = row[1]
    app.config.update(dict(
        ENGINE='postgresql',
        NAME=dbDict['NAME'],
        USER=dbDict['USER'],
        PASSWORD=dbDict['PASSWORD'],
        HOST=dbDict['HOST'],
        PORT=dbDict['PORT'],
    ))

# The database string for connecting to the database
dbString = "postgresql://{0}:{1}@{2}:{3}/{4}".format(
    app.config['USER'],
    app.config['PASSWORD'],
    app.config['HOST'],
    app.config['PORT'],
    app.config['NAME']
)

app.config['SQLALCHEMY_DATABASE_URI'] = dbString
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

from views import *

# Finally, launch the application
if __name__ == "__main__":
    app.run()
