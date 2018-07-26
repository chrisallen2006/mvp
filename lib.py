from model import DmvRecords, TlcDriver, TlcVehicles
from application import db

'''
    This is a Library of all functions used to do data analysis,
    database actions, etc.
'''

BASE_PREMIUM = 3253

# Meta Data class that holds all data needed throughout the app as
# the user continues the signup process


class MetaData(object):

    def __init__(self):
        self.trynum = 0
        self.currTlcDriver = None
        self.currTlcVehicle = None
        self.currDmvRecord = None


# Check if a license number is in the tlc_drivers table and return
# user's name


def getNameFromLicNum(num):
    names = db.session.query(TlcDriver).filter_by(license_num=num).all()
    if (len(names) > 0):
        return names[0]
    else:
        return None


# Query the tlc vehicles table for a given name.
# If found then return that object
# So we can route to the vehicle selection page. Otherwise return None


def getVehicleFromName(name):
    vehicles = db.session.query(TlcVehicles).filter_by(name=name).all()
    if (len(vehicles) > 0):
        return vehicles[0]
    else:
        return None

# Query the tlc vehicles table for a given vin number.
# If found then return that object
# So we can route to the vehicle selection page. Otherwise return None


def getVehicleFromVin(vin):
    vehicles = db.session.query(TlcVehicles).filter_by(vin=vin).all()
    if (len(vehicles) > 0):
        return vehicles[0]
    else:
        return None

# Method to return just the first name of a given string from database


def getFirstName(fullName):
    names = fullName.split(",")
    if (len(names) < 2):
        return fullName
    return names[1].lower().capitalize()

# Method to read dmv_records table and get the record


def getDmvRecord(metadata):
    records = db.session.query(DmvRecords).filter_by(
        tlc_license_num=metadata.currTlcDriver.license_num).all()
    if (len(records) > 0):
        return records[0]
    else:
        return None

# Logic for creating a quote depending on:
    # Age
    # Length of tlc
    # Length of drivers Liscense
    # Points
    # Accidents
    # Vehicle value - TODO: we need this
    # Deductible - TODO: we also need this


def getQuote(
    age, length_of_tlc, length_of_dl, points, accidents,
        vehicle_value, deductible):

    liability_premium = BASE_PREMIUM
    physical_premium = 0

    if age < 21:
        liability_premium += 500

    if length_of_tlc < 1:
        liability_premium += 800

    if length_of_dl < 3:
        liability_premium += 200
    elif length_of_dl < 1:
        liability_premium += 800

    if points > 0 and points < 7:
        liability_premium += points * 50
    elif points > 6:
        liability_premium += ((6 * 50) + ((points - 6) * 200))

    if accidents:
        liability_premium *= 600

    if deductible == 500:
        if liability_premium < 3500:
            physical_premium = vehicle_value * .08
        elif liability_premium < 5000:
            physical_premium = vehicle_value * .1
        elif liability_premium < 6000:
            physical_premium = vehicle_value * .12
        elif liability_premium < 7500:
            physical_premium = vehicle_value * .14
    elif deductible == 1000:
        if liability_premium < 3500:
            physical_premium = vehicle_value * .07
        elif liability_premium < 5000:
            physical_premium = vehicle_value * .09
        elif liability_premium < 6000:
            physical_premium = vehicle_value * .11
        elif liability_premium < 7500:
            physical_premium = vehicle_value * .13

    return (liability_premium, physical_premium)
