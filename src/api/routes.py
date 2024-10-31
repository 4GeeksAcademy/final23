"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask_jwt_extended import create_access_token
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.db_functions import create_user, get_user_by_google_id
from api.google_auth import verify_google_token

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@app.route("/auth-google", methods=["POST"])
def google_login():
    data = request.json
    token = data.get("token")

    # Step 1: Verify Google Token
    user_info = verify_google_token(token)
    if not user_info:
        return jsonify({"error": "Invalid Google token"}), 400

    # Extract relevant info from the token
    google_id = user_info["sub"]  # Unique identifier for the Google account
    email = user_info["email"]

    # Step 2: Check if user already exists in database (use your database logic here)
    # Assuming a function `get_user_by_google_id` checks if user exists
    user = get_user_by_google_id(google_id)
    if not user:
        # Create new user if they don't exist
        user = create_user(email=email, google_id=google_id)

    # Step 3: Generate a JWT token for the user
    access_token = create_access_token(identity=user["id"])

    return jsonify(
        access_token=access_token
    )












