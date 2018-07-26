from sqlalchemy import BigInteger, Boolean, Column
from sqlalchemy import DateTime, Float, String, Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
metadata = Base.metadata


class DmvRecords(Base):
    __tablename__ = 'dmv_records'
    __table_args__ = {'schema': 'mvp'}

    index = Column(BigInteger, index=True, primary_key=True)
    name = Column(Text)
    dob = Column(DateTime)
    tlc_license_num = Column(Text)
    tlc_license_issue_date = Column(DateTime)
    dmv_license_num = Column(Text)
    dmv_license_issue_date = Column(DateTime)
    points = Column(BigInteger)
    accidents = Column(BigInteger)


class PotentialCustomer(Base):
    __tablename__ = 'potential_customers'
    __table_args__ = {'schema': 'mvp'}

    email = Column(String(100), primary_key=True)
    license_img = Column(String(100))
    vin_requested = Column(String(100))
    driver_id = Column(BigInteger)
    tlc_policy = Column(Boolean)


class TlcDriver(Base):
    __tablename__ = 'tlc_drivers'
    __table_args__ = {'schema': 'mvp'}

    driver_id = Column(BigInteger, primary_key=True, index=True)
    last_updated = Column(DateTime)
    license_num = Column(Text)
    name = Column(Text)
    type = Column(Text)
    expiration_date = Column(DateTime)
    wheelchair_accessible_trained = Column(Text)


class TlcVehicles(Base):
    __tablename__ = 'tlc_vehicles'
    __table_args__ = {'schema': 'mvp'}

    index = Column(BigInteger, index=True, primary_key=True)
    last_updated = Column(DateTime)
    active = Column(Text)
    vehicle_license_num = Column(Text)
    name = Column(Text)
    license_type = Column(Text)
    expiration_date = Column(Text)
    permit_license_num = Column(Text)
    license_plate = Column(Text)
    vin = Column(Text)
    wheelchair_accessible = Column(Text)
    certification_date = Column(Text)
    hack_update = Column(Text)
    vehicle_year = Column(Text)
    base_number = Column(Text)
    base_name = Column(Text)
    base_type = Column(Text)
    veh = Column(Text)
    base_phone = Column(Text)
    website = Column(Text)
    base_address = Column(Text)
    reason = Column(Text)
    order_date = Column(Float(53))
