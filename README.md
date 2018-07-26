# Stable Insurance MVP

Below is the framework breakdown and a description of each file/directory.
Also has directions for launching locally.


## Local Development

- Download project.
- Optionally you can create a separate environment to install and launch locally.
- Make sure all database credentials are in a file named `db.csv` but please don't deploy this file to a server.
```sh
pip install -r requirements.txt
python application.py
```

## Framework

- `static`: contains all static css, js, and images used in the website
- `templates`: contains all the html template files written in Jinja2
- `application.py`: builds the database connection, and general setup of the flask app. Used to launch the app.
- `lib.py`: any method for accessing db, data analysis, or helper function is found in here
- `model.py`: this has the classes for all the database tables accessed or written to
- `views.py`: this has all the route functions for the flask app

Further documentation can be found with each method or class.


© 2018 Stable Insurance, Inc. All rights reserved.
