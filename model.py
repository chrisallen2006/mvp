from application import *
from sqlalchemy import BigInteger, Boolean, Column, DateTime, Float, String, Table, Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
metadata = Base.metadata


t_dmv_records = Table(
    'dmv_records', metadata,
    Column('index', BigInteger, index=True),
    Column('name', Text),
    Column('dob', DateTime),
    Column('tlc_license_num', Text),
    Column('tlc_license_issue_date', DateTime),
    Column('dmv_license_num', Text),
    Column('dmv_license_issue_date', DateTime),
    Column('points', BigInteger),
    Column('accidents', BigInteger),
    schema='mvp'
)


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


t_tlc_vehicles = Table(
    'tlc_vehicles', metadata,
    Column('index', BigInteger, index=True),
    Column('last_updated', DateTime),
    Column('active', Text),
    Column('vehicle_license_num', Text),
    Column('name', Text),
    Column('license_type', Text),
    Column('expiration_date', Text),
    Column('permit_license_num', Text),
    Column('license_plate', Text),
    Column('vin', Text),
    Column('wheelchair_accessible', Text),
    Column('certification_date', Text),
    Column('hack_update', Text),
    Column('vehicle_year', Text),
    Column('base_number', Text),
    Column('base_name', Text),
    Column('base_type', Text),
    Column('veh', Text),
    Column('base_phone', Text),
    Column('website', Text),
    Column('base_address', Text),
    Column('reason', Text),
    Column('order_date', Float(53)),
    schema='mvp'
)
