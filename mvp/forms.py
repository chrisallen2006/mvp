from flask_wtf import Form
from wtforms.fields import TextField
from wtforms.validators import DataRequired, Email
from wtforms.fields.html5 import EmailField


class ContactForm(Form):
    name = TextField('Name:', validators=[DataRequired()])
    email = EmailField('Email address', validators=[DataRequired(), Email()])
