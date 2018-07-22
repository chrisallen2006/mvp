from application import *
from lib import *
from model import *

#Home Page
@app.route('/')
def landing():
    return render_template('landing.html')

#Check given TLC number in tlc_drivers table
@app.route('/checkTLC', methods=['POST'])
def checkTLC():
    num = request.form.get('number')
    getNameFromLicNum(num)
    return render_template('landing.html')
