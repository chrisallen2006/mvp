from flask import send_file, Flask, request, session, g, redirect, url_for, abort, render_template, flash
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename

application = app = Flask(__name__)

app.config.from_object(__name__)

#TODO: add database configurations

#Import all views
from views import *

#Finally, launch the application
if __name__ == "__main__":
    app.run()
