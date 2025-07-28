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
import asyncio

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


def construir_prompt(prompt, tema):
    """
    Construye el prompt para Clarifai según el tema.
    :param prompt: str, la pregunta del usuario
    :param tema: str, el tema ("ciencia", "historia", etc)
    :return: str, prompt listo para enviar al modelo
    """
    return f"Eres un experto en {tema}, responde a la siguiente pregunta con una respuesta entre 4 y 6 líneas,enfocada en niños de 7 a 12 años, en español: {prompt}"


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
    print("Entrando al endpoint /ask")
    data = request.get_json()
    print("Datos recibidos:", data)
    prompt = data.get("question")
    print("Prompt recibido:", prompt)
    user_id = data.get("user_id")  # Opcional
    print("User ID recibido:", user_id)
    tema = data.get("tema", "ciencia")  # Por defecto "ciencia" si no se envía
    print("Tema recibido:", tema)

    prompt_arreglado = construir_prompt(prompt, tema)
    print("Prompt arreglado:", prompt_arreglado)

    if not prompt:
        print("Falta la pregunta en el request")
        return jsonify({"msg": "Falta la pregunta"}), 400

    try:
        print("Asegurando event loop para Clarifai SDK")
        try:
            asyncio.get_running_loop()
            print("Event loop ya existe")
        except RuntimeError:
            print("No hay event loop, creando uno nuevo")
            asyncio.set_event_loop(asyncio.new_event_loop())

        model_url = "https://clarifai.com/deepseek-ai/deepseek-chat/models/DeepSeek-R1-0528-Qwen3-8B"
        print("URL del modelo:", model_url)
        print("Creando modelo Clarifai")
        model_prediction = Model(
            url=model_url, pat="695686e42b93409db0ba27f5ac5cdd75"
        ).predict_by_bytes(prompt_arreglado.encode())
        print("Respuesta de Clarifai recibida")

        answer = model_prediction.outputs[0].data.text.raw

        # Elimina el prompt original si aparece al inicio de la respuesta
        if answer.startswith(prompt):
            answer = answer[len(prompt):].lstrip()

        # Opcional: elimina el prompt arreglado si lo usas
        if answer.startswith(prompt_arreglado):
            answer = answer[len(prompt_arreglado):].lstrip()

        print("Respuesta procesada:", answer)

    except Exception as e:
        print("Clarifai error:", e)
        return jsonify({"msg": "Error al conectar con Clarifai", "error": str(e)}), 500

    print("Guardando chat en la base de datos")
    chat = Chat(prompt=prompt, response=answer, user_id=user_id)
    db.session.add(chat)
    db.session.commit()
    print("Chat guardado correctamente")

    return jsonify({"answer": answer, "chat": chat.serialize()}), 200


@api.route('/chat', methods=['GET'])
def get_chats():
    chats = Chat.query.all()
    return jsonify([chat.serialize() for chat in chats]), 200


@api.route('/qa', methods=['GET'])
def get_qas():
    qas = QA.query.all()
    return jsonify([qa.serialize() for qa in qas]), 200
