import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Función para transformar el texto de answer a HTML estilizado
function answerStyle(text) {
    if (!text) return "";

    // 1. Reemplaza **frase** por <b>frase</b>
    let html = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

    // 2. Detecta listas numeradas tipo: 1. texto, 2. texto, ... y las convierte en <ul><li>...</li></ul>
    const lines = html.split(/\n/);
    let inList = false;
    let result = [];
    lines.forEach(line => {
        const match = line.match(/^\s*(\d+)\.\s*(.*)/);
        if (match) {
            if (!inList) {
                result.push("<ul style='text-align:left; margin-left:1.5em;'>");
                inList = true;
            }
            result.push(`<li>${match[2]}</li>`);
        } else {
            if (inList) {
                result.push("</ul>");
                inList = false;
            }
            result.push(line);
        }
    });
    if (inList) result.push("</ul>");
    html = result.join("\n");

    // 3. Opcional: reemplaza saltos de línea por <br> para mantener formato
    html = html.replace(/\n/g, "<br>");

    return html;
}

const Chatciencia = () => {
    const cloudColor = "#6EC6F3";
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    const user_id = localStorage.getItem("user_id");
    const userEmail = localStorage.getItem("userEmail");
    const navigate = useNavigate();

    const [ultimasPreguntas, setUltimasPreguntas] = useState([]);

    const handleInputChange = (e) => {
        setQuestion(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAnswer("");
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/ask`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    question,
                    tema: "ciencia",
                    user_id: user_id // envía el id numérico del usuario
                })
            });
            const data = await response.json();
            if (response.ok) {
                setAnswer(data.answer);
            } else {
                setAnswer("Ocurrió un error al consultar la API.");
            }
        } catch (err) {
            setAnswer("Error de conexión con el servidor.");
        }
        setLoading(false);
        setQuestion("");
        // Actualiza el historial después de preguntar
        fetchUltimasPreguntas();
    };

    // Fetch para traer las últimas 2 preguntas de ciencia desde la API
    const fetchUltimasPreguntas = async () => {
        if (!user_id) return;
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat?user_id=${user_id}`);
            const data = await response.json();
            const ultimas = data
                .filter(chat => chat.tema === "ciencia" || (chat.prompt && chat.prompt.toLowerCase().includes("ciencia")))
                .slice(-2)
                .reverse()
                .map(chat => ({
                    ...chat,
                    primerParrafo: chat.response ? chat.response.split('\n')[0] : ""
                }));
            setUltimasPreguntas(ultimas);
        } catch (error) {
            setUltimasPreguntas([]);
        }
    };

    useEffect(() => {
        fetchUltimasPreguntas();
        // eslint-disable-next-line
    }, [user_id]);

    return (
        <div className="container-fluid w-100 d-flex flex-column align-items-center justify-content-center vh-100 bg-celeste-confetti" style={{ position: "relative", overflow: "hidden" }}>
            {/* Navbar morada clara, redondeada y con padding arriba */}
            <nav className="navbar-morada w-100" style={{ minWidth: 0 }}>
                {/* Botón izquierdo con texto "Historial" que navega a /historial */}
                <button
                    className="navbar-btn-izq"
                    onClick={() => navigate("/historial")}
                >
                    Historial
                </button>
                {/* Mail del usuario centrado */}
                <div style={{
                    flex: 1,
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    color: "#fff"
                }}>
                    {userEmail}
                </div>
                {/* Botón cerrar sesión */}
                <button
                    className="navbar-btn-cerrar"
                    onClick={() => navigate("/login")}
                >
                    Cerrar sesión
                </button>
            </nav>

            {/* Espacio para que la navbar fija no tape el contenido */}
            <div style={{ height: "100px" }}></div>

            {/* Botón volver a chats */}
            <div className="d-flex justify-content-end w-100" style={{ marginBottom: "16px" }}>
                <Link to="/userpage" style={{ minWidth: "200px", textDecoration: "none" }}>
                    <button className="btn btn-rosado">
                        Volver a chats
                    </button>
                </Link>
            </div>
            <div className="card-custom card-ciencia p-5 shadow w-100" style={{ maxWidth: "600px", borderRadius: "32px", alignItems: "flex-start" }}>
                <h2 className="mb-4 text-center w-100" style={{ fontWeight: "bold", color: "#444", fontSize: "2.5rem" }}>
                    Pregúntame sobre ciencia
                </h2>
                <form onSubmit={handleSubmit} className="w-100 d-flex flex-column align-items-center">
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Escribe tu pregunta aquí..."
                        value={question}
                        onChange={handleInputChange}
                        style={{
                            borderRadius: "20px",
                            fontSize: "1.2rem",
                            width: "100%",
                            padding: "18px 20px"
                        }}
                        required
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        className="btn"
                        style={{
                            height: "60px",
                            fontSize: "1.3rem",
                            backgroundColor: cloudColor,
                            borderColor: cloudColor,
                            color: "#fff",
                            borderRadius: "20px",
                            fontWeight: "bold",
                            minWidth: "160px"
                        }}
                        disabled={loading}
                    >
                        Preguntar
                    </button>
                    {loading && (
                        <div style={{ marginTop: "24px", textAlign: "center" }}>
                            <span
                                className="loading-bounce"
                                role="img"
                                aria-label="niño saltando"
                                style={{ fontSize: "11rem", lineHeight: "1" }}
                            >
                                🐙
                            </span>
                            <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#444" }}>
                                ¡Espéranos un momento!
                            </div>
                        </div>
                    )}
                </form>
                <div
                    className="respuesta-clarifai"
                    dangerouslySetInnerHTML={{ __html: answerStyle(answer) }}
                />
                {/* Historial de las últimas 2 preguntas SOLO de ciencia */}
                <div className="mt-5 w-100">
                    <h4 style={{ color: "#444", fontWeight: "bold" }}>Tus últimas preguntas</h4>
                    <div className="d-flex flex-column gap-3">
                        {ultimasPreguntas.length === 0 ? (
                            <div className="text-center text-muted" style={{ fontSize: "1.2rem" }}>
                                No hay preguntas recientes.
                            </div>
                        ) : (
                            ultimasPreguntas.map((pregunta, idx) => (
                                <div
                                    key={idx}
                                    className="d-flex flex-column mb-3"
                                    style={{
                                        borderRadius: "20px",
                                        backgroundColor: "#FFF9C4",
                                        padding: "16px 24px",
                                        fontWeight: "bold",
                                        fontSize: "1.2rem",
                                        color: "#444",
                                        width: "100%",
                                        textAlign: "left"
                                    }}
                                >
                                    <div className="d-flex flex-row align-items-center">
                                        <span style={{
                                            color: "#fff",
                                            backgroundColor: "#FFD600",
                                            borderRadius: "12px",
                                            padding: "6px 18px",
                                            marginRight: "16px",
                                            minWidth: "90px",
                                            textTransform: "capitalize",
                                            display: "inline-block"
                                        }}>
                                            Ciencia
                                        </span>
                                        <span style={{ flex: 1 }}>
                                            {pregunta.prompt}
                                        </span>
                                    </div>
                                    <div style={{
                                        marginLeft: "106px",
                                        marginTop: "8px",
                                        fontWeight: "normal",
                                        fontSize: "1.1rem",
                                        color: "#333",
                                        whiteSpace: "pre-line"
                                    }}>
                                        {pregunta.primerParrafo}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatciencia;