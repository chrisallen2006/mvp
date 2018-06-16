from flask import Flask, render_template

app = Flask(__name__)

@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404

@app.route('/')
def homepage():
    return render_template('index.html')

@app.route('/<string:page_name>')
def static_page(page_name):
    return render_template('{0}.html'.format(page_name))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
