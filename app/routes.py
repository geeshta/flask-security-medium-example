from flask.wrappers import Response
from flask_wtf.csrf import generate_csrf
from app import server, views


@server.after_request
def add_csrf_cookie(response: Response):
    if response.status_code in range(200, 400) and not response.direct_passthrough:
        response.set_cookie("csrftoken", generate_csrf(), secure=True)
    return response


server.add_url_rule("/", view_func=views.index)
server.add_url_rule("/greet", view_func=views.greet, methods=["POST"])
