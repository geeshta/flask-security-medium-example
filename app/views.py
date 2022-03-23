from typing import cast

from flask import render_template, request, session


def index():
    return render_template("index.html")


def greet():
    # Read the json body of the incoming request
    data = cast(dict, request.json)
    username = data.get("username")

    # If it's emtpy, try reading it from the session, otherwise set a default
    if not username:
        username = session.get("username") or "World"
    # If it's not empty, save it to the session
    else:
        session["username"] = username

    return {"greeting": f"Hello, {username}!"}
