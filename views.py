from lib import getNameFromLicNum, getVehicleFromName, getVehicleFromVin
from lib import getFirstName, getDmvRecord, MetaData
from application import *

metadata = MetaData()

# Landing page is the page to input the driver's tlc number


@app.route('/')
def landing():
    return render_template('tlc_number_page.html', tryNum=metadata.trynum)

# Check given TLC number in tlc_drivers table
# This is called once the user puts a tlc number into the landing page


@app.route('/checkTLC', methods=['POST'])
def checkTLC():
    # Get the number inputted in the form
    num = request.form.get('number')

    # Get the name the TLC number given corresponds to. None if not found.
    name = getNameFromLicNum(num)

    # If there is a match, move on to the driver selection page
    if (name is not None):
        metadata.currTlcDriver = name
        return render_template(
            'driver_selection_page.html', driverName=name.name)

    # If there is not a match, then ask them to enter the number again
    # If it is the 3rd or greater time
    # then also attach the name, email, etc form
    # global metadata
    metadata.trynum += 1
    return render_template('tlc_number_page.html', tryNum=metadata.trynum)

# Time to query the vehicle from the driver_selection_page
# This is called if the user selects "I Am <Name>" from the driver
# Selection page


@app.route('/queryVehicle')
def queryVehicle():
    # Get the vehicle from the table

    vehicle = getVehicleFromName(metadata.currTlcDriver.name)

    # If we found a vehicle then split the specific name, vehicle, vin
    # and plate for the vehicle selection page

    if (vehicle is not None):
        metadata.currTlcVehicle = vehicle
        name = getFirstName(metadata.currTlcDriver.name)
        vehicleName = vehicle.base_type
        vin = vehicle.vin[len(vehicle.vin)-4:len(vehicle.vin)]
        plate = vehicle.license_plate
        return render_template(
            'vehicle_selection_page.html',
            name=name,
            vehicleName=vehicleName,
            vin=vin,
            plate=plate)

    return render_template('vin_number_page.html', tryNum=metadata.trynum)

# Quick route to vin number page


@app.route('/vinNumber')
def routeToVin():
    return render_template('vin_number_page.html', tryNum=metadata.trynum)

# Route to the email and dob page


@app.route('/toEmailDob')
def routeToEmailDob():
    return render_template('email_dob_page.html')

# The user needs further assistance, simple route to contact page


@app.route('/furtherAssist')
def furtherAssist():
    return render_template('further_assist.html')

# The user does not recognize that name, maybe they punched the wrong tlc in
# This could be simplified but basically starts the process over


@app.route('/reEnterTLC')
def reEnterTLC():
    metadata.trynum = 0
    return render_template('tlc_number_page.html', tryNum=metadata.trynum)


# Method that if the contact form is clicked this will be called
# TODO: add actual connections to send contact info


@app.route('/contactUs', methods=['POST'])
def contactUs():
    return render_template('further_assist.html')

# Checking vin number given
# This is called if the user says that was not their vehicle and now they
# Can punch in their vin number. Now we check that vin given and open
# The vehicle selection page again


@app.route('/checkVin', methods=['POST'])
def checkVin():
    num = request.form.get('number')
    vehicle = getVehicleFromVin(num)
    if (vehicle is not None):
        metadata.currTlcVehicle = vehicle
        name = getFirstName(metadata.currTlcDriver.name)
        vehicleName = vehicle.base_type
        vin = vehicle.vin[len(vehicle.vin)-4:len(vehicle.vin)]
        plate = vehicle.license_plate
        return render_template(
            'vehicle_selection_page.html',
            name=name,
            vehicleName=vehicleName,
            vin=vin,
            plate=plate)
    metadata.trynum += 1
    return render_template('vin_number_page.html', tryNum=metadata.trynum)

# Once all the info is good to go, create quote. This needs to be built.


@app.route('/createQuote', methods=['POST'])
def createQuote():
    # age, length_of_tlc, length_of_dl, points, accidents,
    #               vehicle_value, deductible
    # First we need to get the DMV records
    # TODO: for mvp we assume this is always correct
    metadata.currDmvRecord = getDmvRecord(metadata)
    #  (lPrem, pPrem) = getQuote(
    #      calcYearsSince(metadata.currDmvRecord.dob),
    #      calcYearsSince(metadata.currDmvRecord.tlc_license_issue_date),
    #      calcYearsSince(metadata.currDmvRecord.dmv_license_issue_date),
    #      metadata.currDmvRecord.points,
    #      metadata.currDmvRecord.accidents,
    #      # TODO:vehicle value,
    #      # TODO:deductible
    #  )
    return render_template('info_confirmation.html')
