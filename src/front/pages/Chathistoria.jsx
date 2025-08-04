import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Chathistoria = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    const userEmail = localStorage.getItem("userEmail");
    const key = `historialPreguntas_${userEmail}`;
    const [historial, setHistorial] = useState(
        JSON.parse(localStorage.getItem(key)) || []
    );

    const navigate = useNavigate();

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
                body: JSON.stringify({ question, tema: "historia" })
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

        // Guardar pregunta en historial solo para este usuario
        const historial = JSON.parse(localStorage.getItem(key)) || [];
        historial.push({ pregunta: question, respuesta: answer, tema: "historia" });
        localStorage.setItem(key, JSON.stringify(historial));
        setHistorial(historial);
    };

    // Últimas 3 preguntas SOLO de historia
    const ultimasPreguntas = historial
        .filter(p => p.tema === "historia")
        .slice(-3)
        .reverse();

    return (
        <div className="container-fluid w-100 d-flex flex-column align-items-center justify-content-center vh-100 bg-celeste-confetti" style={{ position: "relative", overflow: "hidden" }}>
            <nav className="navbar-morada w-100">
                <button className="navbar-btn-izq" onClick={() => navigate("/historial")}>Historial</button>
                <div style={{ flex: 1, textAlign: "center", fontWeight: "bold", fontSize: "1.2rem", color: "#fff" }}>{userEmail}</div>
                <button className="navbar-btn-cerrar" onClick={() => navigate("/login")}>Cerrar sesión</button>
            </nav>
            <div style={{ height: "100px" }}></div>
            <div className="d-flex justify-content-start w-100" style={{ marginBottom: "16px" }}>
                <Link to="/userpage" style={{ minWidth: "200px", textDecoration: "none" }}>
                    <button className="btn btn-rosado">Volver a chats</button>
                </Link>
            </div>
            <div className="card-custom card-historia p-5 shadow w-100" style={{ maxWidth: "600px", borderRadius: "32px", alignItems: "flex-start" }}>
                <h2 className="mb-4 text-center w-100" style={{ fontWeight: "bold", color: "#222", fontSize: "2.5rem" }}>
                    Pregúntame sobre historia
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
                            backgroundColor: "#A6E9B4",
                            borderColor: "#A6E9B4",
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
                                aria-label="hongo saltando"
                                style={{ fontSize: "11rem", lineHeight: "1" }}
                            >
                                🍄
                            </span>
                            <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#444" }}>
                                ¡Espéranos un momento!
                            </div>
                        </div>
                    )}
                </form>
                <div
                    className="respuesta-clarifai"
                    dangerouslySetInnerHTML={{ __html: answer }}
                />
                <div className="mt-5 w-100">
                    <h4 style={{ color: "black", fontWeight: "bold" }}>Tus últimas preguntas</h4>
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
                                        backgroundColor: "#A6E9B4",
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
                                            backgroundColor: "#43A047",
                                            borderRadius: "12px",
                                            padding: "6px 18px",
                                            marginRight: "16px",
                                            minWidth: "90px",
                                            textTransform: "capitalize",
                                            display: "inline-block"
                                        }}>
                                            {pregunta.tema}
                                        </span>
                                        <span style={{ flex: 1 }}>
                                            {pregunta.pregunta || pregunta.texto?.split('\n')[0] || "Pregunta"}
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
                                        {
                                            pregunta.respuesta
                                                ? pregunta.respuesta.split('\n').slice(0, 3).join('\n')
                                                : pregunta.texto
                                                    ? pregunta.texto.split('\n').slice(1, 4).join('\n')
                                                    : ""
                                        }
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

export default Chathistoria;