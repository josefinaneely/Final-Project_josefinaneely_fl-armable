"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, QA, Chat
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import jwt
import datetime
import os

# Importa el SDK de Clarifai
from clarifai.client.model import Model

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200


@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"msg": "Faltan datos"}), 400

    user = User.query.filter_by(email=email, password=password).first()
    if user:
        token = jwt.encode({
            "id": user.id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, os.environ.get("FLASK_APP_KEY", "sample key"), algorithm="HS256")
        return jsonify({"token": token, "user": user.serialize()}), 200
    else:
        return jsonify({"msg": "Usuario o contraseña incorrectos"}), 401


@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    name = data.get("name")

    if not email or not password or not name:
        return jsonify({"msg": "Faltan datos"}), 400

    # Verifica si el usuario ya existe
    user_exists = User.query.filter_by(email=email).first()
    if user_exists:
        return jsonify({"msg": "El usuario ya existe"}), 400

    # Crea el nuevo usuario
    new_user = User(email=email, password=password, name=name)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Usuario creado exitosamente"}), 201


@api.route('/ask', methods=['POST'])
def ask_clarifai():
    data = request.get_json()
    prompt = data.get("question")
    user_id = data.get("user_id")  # Opcional

    if not prompt:
        return jsonify({"msg": "Falta la pregunta"}), 400

    # Llama a la API de Clarifai (GPT-4_1)
    try:
        model = Model(
            url="https://clarifai.com/openai/chat-completion/models/gpt-4_1")
        response = model.predict(prompt=prompt)
        # Si la respuesta es un objeto, ajusta para extraer el texto
        answer = response if isinstance(response, str) else str(response)
    except Exception as e:
        return jsonify({"msg": "Error al conectar con Clarifai", "error": str(e)}), 500

    # Guarda en la base de datos
    chat = Chat(prompt=prompt, response=answer, user_id=user_id)
    db.session.add(chat)
    db.session.commit()

    return jsonify({"answer": answer, "chat": chat.serialize()}), 200


@api.route('/chat', methods=['GET'])
def get_chats():
    chats = Chat.query.all()
    return jsonify([chat.serialize() for chat in chats]), 200


@api.route('/qa', methods=['GET'])
def get_qas():
    qas = QA.query.all()
    return jsonify([qa.serialize() for qa in qas]), 200
