APP_NAME = 'CAPNER'
APP_CONTACT = 'jjuhn@can.ubc.ca'

WTF_CSRF_ENABLED = True
SECRET_KEY = 'super-secret'


# SQLALCHEMY_DATABASE_URI = 'sqlite:////Applications/PyCharm.app/Contents/bin/lims.sqlite'
SQLALCHEMY_DATABASE_URI = 'postgresql://jj@localhost/capner'
SQLALCHEMY_TRACK_MODIFICATIONS = True
# SQLALCHEMY_ECHO = True


# MAIL_SERVER = 'smtp.gmail.com'
# MAIL_PORT = 465
# MAIL_USE_SSL = True
MAIL_USERNAME = 'capner.ca@gmail.com'
MAIL_PASSWORD = 'ajsdfinzxcv'


RECAPTCHA_PUBLIC_KEY = '6LfmDSATAAAAAAuzB4kg9Vo0vX_9xsuqaOjVDXax'
RECAPTCHA_PRIVATE_KEY = '6LfmDSATAAAAAKI0YXv3a8O0JnfFs6tuFZOTVGcl'
DEFAULT_PASSWORD = 'welcome'

GOOGLE_API_KEY = 'AIzaSyBh9B0zui9FyRzwP9eNB7yeQWlIZOspV24'
PRIVATE_DIR = '/Users/jj/private/msa/data'
UPLOAD_FOLDER = '/Users/jj/private/msa/upload_data'

