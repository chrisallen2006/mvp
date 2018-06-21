from flask import flash, Flask, redirect, render_template, request
from sqlalchemy.sql import text

from .forms import ContactForm
from .utils.db_helper import session_scope


app = Flask(__name__)
app.config.from_object('config')

INSERT = ('INSERT INTO mvp.potential_customers (email, driver_id) VALUES (:email, :driver_id)')
SELECT = ('SELECT * FROM mvp.tlc_drivers WHERE license_num = :driver_id')

@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404

@app.route('/', methods=['GET', 'POST'])
def homepage():
    form = ContactForm()

    if form.validate_on_submit():
        email = form.email.data
        driver_id = form.driver_id.data
        with session_scope() as s:
            s.execute(INSERT, {'email': email, 'driver_id': driver_id})
            row = s.execute(SELECT, {'driver_id': driver_id}).first()
            if row:
                name = ' '.join(row.name.title().split(','))
                return render_template('license-found.html', name=name)
            else:
                return redirect('license-not-found')

    return render_template('index.html', form=form)

@app.route('/<string:page_name>')
def static_page(page_name):
    return render_template('{0}.html'.format(page_name))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
