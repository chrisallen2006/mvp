from lib import *
from application import *

metadata = MetaData()

# Landing page is the page to input the driver's tlc number
@app.route('/')
def landing():
    metadata.trynum = 0
    return render_template('tlc_number_page.html', tryNum=metadata.trynum)


# API route to return Driver details by TLC number.
@app.route('/api/v1/checkTLC', methods=['POST'])
def apiCheckTLC():
    # Get the number inputted in the form
    reqJson = request.get_json('number')

    # Get the name the TLC number given corresponds to. None if not found.
    name = getNameFromLicNum(reqJson['number'])

    # If there is a match, use driver data, else use empty string
    trynum = 0
    if (name is not None):
        driverName = name.name
        currTlcDriver = formatName(name.name)
    else:
        trynum += 1
        currTlcDriver = ''
        driverName = ''

    # Build JSON API response
    jsonResponse = jsonify({
        'driver': str(currTlcDriver),
        'trynum': trynum,
        'driverName': driverName 
    })
    jsonResponse.headers.add('Access-Control-Allow-Origin', '*')
    return jsonResponse


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
        metadata.trynum = 0
        return render_template(
            'driver_selection_page.html', driverName=formatName(name.name))

    # If there is not a match, then ask them to enter the number again
    # If it is the 3rd or greater time
    # then also attach the name, email, etc form
    # global metadata
    metadata.trynum += 1
    return render_template('tlc_number_page.html', tryNum=metadata.trynum)


# API route to get Vehicle info from Driver page 
@app.route('/api/v1/queryVehicle', methods=['POST'])
def apiQueryVehicle():
    #Get Driver Name from POST params
    reqJson = request.get_json('driver')
    driverName = reqJson['driver']
    print(driverName)

    #Get Vehicle from DB Table using Driver Name
    vehicle = getVehicleFromName(driverName)

    if (vehicle is not None):
        name = getFirstName(driverName)
        vehicleName = "{0} {1}".format(vehicle.vehicle_year, vehicle.base_type)
        print(vehicleName)
        vin = vehicle.vin[len(vehicle.vin)-6:len(vehicle.vin)]
        plate = vehicle.license_plate
    else:
        vehicleName = ''
        vin = ''
        plate = ''

    # Build JSON API response
    jsonResponse = jsonify({
        'driver': driverName,
        'car': {
            'vehicle': vehicleName,
            'vinEnd': vin,
            'plate': plate
        }
    })
    jsonResponse.headers.add('Access-Control-Allow-Origin', '*')
    return jsonResponse


# Time to query the vehicle from the driver_selection_page
# This is called if the user selects "I Am <Name>" from the driver
# Selection page
@app.route('/queryVehicle')
def queryVehicle():
    # Get the vehicle from the table
    print(metadata.currTlcDriver.name)
    vehicle = getVehicleFromName(metadata.currTlcDriver.name)

    # If we found a vehicle then split the specific name, vehicle, vin
    # and plate for the vehicle selection page

    if (vehicle is not None):
        metadata.currTlcVehicle = vehicle
        name = getFirstName(metadata.currTlcDriver.name)
        vehicleName = "{0} {1}".format(vehicle.vehicle_year, vehicle.base_type)
        vin = vehicle.vin[len(vehicle.vin)-6:len(vehicle.vin)]
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


# API route to get and save the Email and DOB
@app.route('/api/v1/saveEmailDob', methods=['POST'])
def apiSaveEmailDob():
    email = request.get_json('email')['email']
    month = request.get_json('month')['month']
    day = request.get_json('day')['day']
    year = request.get_json('year')['year']
    print(email, month, day, year)
    jsonResponse = jsonify({'succes': True})
    jsonResponse.headers.add('Access-Control-Allow-Origin', '*')
    return jsonResponse


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


# API route to get Car details by VIN no
@app.route('/api/v1/checkVin', methods=['POST'])
def apiCheckVin():
    num = request.get_json('vin')['vin']
    vehicle = getVehicleFromVin(num)

    if (vehicle is not None):
        metadata.currTlcVehicle = vehicle
        metadata.trynum = 0
        driverName = getFirstName(metadata.currTlcVehicle.name)
        vehicleName = "{0} {1}".format(vehicle.vehicle_year, vehicle.base_type)
        vin = vehicle.vin[len(vehicle.vin)-6:len(vehicle.vin)]
        plate = vehicle.license_plate
    else:
        driverName = ''
        vehicleName = ''
        vin = ''
        plate = ''

    # Build JSON API response
    jsonResponse = jsonify({
        'driver': driverName,
        'car': {
            'vehicle': vehicleName,
            'vinEnd': vin,
            'plate': plate
        }
    })
    jsonResponse.headers.add('Access-Control-Allow-Origin', '*')
    return jsonResponse

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
        metadata.trynum = 0
        name = getFirstName(metadata.currTlcVehicle.name)
        vehicleName = "{0} {1}".format(vehicle.vehicle_year, vehicle.base_type)
        vin = vehicle.vin[len(vehicle.vin)-6:len(vehicle.vin)]
        plate = vehicle.license_plate
        return render_template(
            'vehicle_selection_page.html',
            name=name,
            vehicleName=vehicleName,
            vin=vin,
            plate=plate)
    metadata.trynum += 1
    return render_template('vin_number_page.html', tryNum=metadata.trynum)

# API route to get and save the Email and DOB
@app.route('/api/v1/createQuote', methods=['POST'])
def apiCreateQuote():
    # Get POST params: TLC license no, DOB
    tlc = request.get_json('tlc')['tlc']
    
    # First we need to get the DMV records
    # TODO: for mvp we assume this is always correct
    metadata.currDmvRecord = getDmvRecord(tlc)
    if (metadata.currDmvRecord is None):
        #TODO: this is really hacky for the MVP, but if we don't find the
        # actual person, then let's just use the first entry in the dmv
        # database
         metadata.currDmvRecord = getDmvRecord("5650207")

    (lPrem, pPrem) = getQuote(
         calcYearsSince(metadata.currDmvRecord.dob),
         calcYearsSince(metadata.currDmvRecord.tlc_license_issue_date),
         calcYearsSince(metadata.currDmvRecord.dmv_license_issue_date),
         metadata.currDmvRecord.points,
         metadata.currDmvRecord.accidents
    )
    lPrem="%.2f" % lPrem
    pPrem="%.2f" % pPrem

    jsonResponse = jsonify({'liability': lPrem, 'physical': pPrem})
    jsonResponse.headers.add('Access-Control-Allow-Origin', '*')
    return jsonResponse


# Once all the info is good to go, create quote. This needs to be built.
@app.route('/createQuote', methods=['POST'])
def createQuote():
    # First we need to get the DMV records
    # TODO: for mvp we assume this is always correct
    metadata.currDmvRecord = getDmvRecord(metadata.currTlcDriver.license_num)
    if (metadata.currDmvRecord is None):

        #TODO: this is really hacky for the MVP, but if we don't find the
        # actual person, then let's just use the first entry in the dmv
        # database
        metadata.currDmvRecord = getDmvRecord("5650207")

    (lPrem, pPrem) = getQuote(
         calcYearsSince(metadata.currDmvRecord.dob),
         calcYearsSince(metadata.currDmvRecord.tlc_license_issue_date),
         calcYearsSince(metadata.currDmvRecord.dmv_license_issue_date),
         metadata.currDmvRecord.points,
         metadata.currDmvRecord.accidents
     )
    return render_template('info_confirmation.html', lPrem="%.2f" % lPrem, pPrem="%.2f" % pPrem)
