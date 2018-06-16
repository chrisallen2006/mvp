from flask import Flask, render_template, request

from src.forms import ContactForm

app = Flask(__name__)
app.config['SECRET_KEY'] = '7d441f27d441f27567d441f2b6176a'

@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404

@app.route('/', methods=['GET', 'POST'])
def homepage():
    form = ContactForm(request.form)

    if request.method == 'POST':
        name = request.form.name
        email = request.form.email

        return 'Hello, world'

    return render_template('index.html')

@app.route('/<string:page_name>')
def static_page(page_name):
    return render_template('{0}.html'.format(page_name))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
