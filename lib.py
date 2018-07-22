from application import *
from model import *

'''
    This is a Library of all functions used to do data analysis, database actions, etc.
'''

#Check if a license number is in the tlc_drivers table and return user's name
def getNameFromLicNum(num):
    names = db.session.query(tlc_drivers).filter_by(license_num = num).all()
    if (len(names) > 0):
        print(names[0])
    else:
        print("No User With That Number")
