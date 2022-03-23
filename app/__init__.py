import json
from flask import Flask
from flask_wtf.csrf import CSRFProtect

server = Flask(__name__)
server.config.from_file("config.json", load=json.load)
CSRFProtect(server)

from app import routes
