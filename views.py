from application import *
from lib import *
from model import *

#Home Page
@app.route('/')
def landing():
    return render_template('tlc_number_page.html', tryNum=TRYNUM)

#Check given TLC number in tlc_drivers table
@app.route('/checkTLC', methods=['POST'])
def checkTLC():
    #Get the number inputted in the form
    num = request.form.get('number')

    #Get the name the TLC number given corresponds to. None if not found.
    name = getNameFromLicNum(num)

    #If there is a match, move on to the driver selection page
    if (name != None):
        global CURRUSER
        CURRUSER = name
        return render_template('driver_selection_page.html', driverName=name.name)

    #If there is not a match, then ask them to enter the number again
    #If it is the 3rd or greater time then also attach the name, email, etc form
    global TRYNUM
    TRYNUM += 1
    return render_template('tlc_number_page.html', tryNum=TRYNUM)

#Time to query the vehicle from the driver_selection_page
@app.route('/queryVehicle')
def queryVehicle():
    return render_template('conclusion.html')

#The user needs further assistance
@app.route('/furtherAssist')
def furtherAssist():
    return render_template('conclusion.html')

#The user does not recognize that name, maybe they punched the wrong tlc in
@app.route('/reEnterTLC')
def reEnterTLC():
    return render_template('conclusion.html')


#Method that if the contact form is clicked this will be called
@app.route('/contactUs', methods=['POST'])
def contactUs():
    return render_template('conclusion.html')
