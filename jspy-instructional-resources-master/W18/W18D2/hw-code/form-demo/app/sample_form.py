from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Length

class SampleForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(min=4, max=12)])
    submit = SubmitField('Save')
