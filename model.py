from application import db
"""
    The Database Tables
"""

class tlc_drivers(db.Model):
    driver_id = db.Column(db.Integer, primary_key=True)
    last_updated = db.Column(db.Date)
    license_num = db.Column(db.String(300))
    name = db.Column(db.String(300))
    type = db.Column(db.String(300))
    expiration_date = db.Column(db.Date)
    wheelchair_accessible_trained = db.Column(db.String(300))
