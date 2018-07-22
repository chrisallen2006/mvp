from flask import send_file, Flask, request, session, g, redirect, url_for, abort, render_template, flash
from flask_sqlalchemy import SQLAlchemy
import os, csv, psycopg2

application = app = Flask(__name__)

app.config.from_object(__name__)

#add database configurations
if ('RDS_HOSTNAME' in os.environ):
    app.config.update(dict(
        ENGINE = 'postgresql',
        NAME = os.environ['RDS_DB_NAME'],
        USER = os.environ['RDS_USERNAME'],
        PASSWORD = os.environ['RDS_PASSWORD'],
        HOST = os.environ['RDS_HOSTNAME'],
        PORT = os.environ['RDS_PORT'],
    ))
else:
    #This means we are in local development
    dbDict = {}
    with open('db.csv', 'r') as csvfile:
        dbReader = csv.reader(csvfile, delimiter=' ', quotechar='|')
        for row in dbReader:
            dbDict[row[0]] = row[1]
    app.config.update(dict(
        ENGINE = 'postgresql',
        NAME = dbDict['NAME'],
        USER = dbDict['USER'],
        PASSWORD = dbDict['PASSWORD'],
        HOST = dbDict['HOST'],
        PORT = dbDict['PORT'],
    ))

dbString = 'postgresql://' + app.config['USER'] + ':' + app.config['PASSWORD'] + '@' + app.config['HOST'] + '/' + app.config['NAME']
app.config['SQLALCHEMY_DATABASE_URI'] = dbString
db = SQLAlchemy(app)


#Import all views
from views import *

#Finally, launch the application
if __name__ == "__main__":
    app.run()
