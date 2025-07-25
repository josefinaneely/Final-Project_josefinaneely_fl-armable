from flask import Flask
from src.api.routes import api
import os
from clarifai.client.model import Model
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configura tu PAT real de Clarifai
os.environ["CLARIFAI_PAT"] = "695686e42b93409db0ba27f5ac5cdd75"

# Ejemplo de inicialización del modelo Clarifai (ajusta <user-id> y <app-id>)
model = Model("https://clarifai.com/openai/chat-completion/models/gpt-4_1")

app.register_blueprint(api, url_prefix="/api")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
