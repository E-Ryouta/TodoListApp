from flask import Flask
from .config import Config
from .controllers import bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.register_blueprint(bp, url_prefix="/api")
    return app

app = create_app()