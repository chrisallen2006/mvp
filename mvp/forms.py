from flask_wtf import Form
from wtforms.fields import StringField, SubmitField
from wtforms.validators import DataRequired, Email
from wtforms.fields.html5 import EmailField


class ContactForm(Form):
    driver_id = StringField('TLC License Number', validators=[DataRequired()])
    email = EmailField('Email address', validators=[DataRequired(), Email()])
    submit = SubmitField('Continue')
