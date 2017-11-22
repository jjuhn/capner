from flask import jsonify
from flask import request
from flask_login import login_required

from msa.core import db
from msa.core import api

from sa_jsonapi import serializer as jsonapi

@api.route('/pictures/')
@login_required
def get_pictures():
    response = jsonapi.get_collection(db.session, request.args, 'pictures')
    return jsonify(response.document), response.status

