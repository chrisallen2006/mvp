from application import *
from lib import *
from model import *

#Home Page
@app.route('/')
def landing():
    return render_template('landing.html')
