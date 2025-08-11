import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Historial = () => {
    const [preguntas, setPreguntas] = useState([]);
    const navigate = useNavigate();
    const userEmail = localStorage.getItem("userEmail");
    const user_id = localStorage.getItem("user_id");


    useEffect(() => {
        if (!user_id) return;
        const fetchChats = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat?user_id=${user_id}`);
                const data = await response.json();
                const preguntasConPrimerParrafo = data
                    .slice(-6)
                    .reverse()
                    .map(chat => ({
                        ...chat,
                        primerParrafo: chat.response ? chat.response.split('\n')[0] : "",
                        tema: chat.tema || (chat.prompt && chat.prompt.toLowerCase().includes("historia") ? "historia" : "ciencia")
                    }));
                setPreguntas(preguntasConPrimerParrafo);
            } catch (error) {
                setPreguntas([]);
            }
        };
        fetchChats();
    }, [user_id]);

    return (
        <div
            className="vh-100 d-flex flex-column align-items-center justify-content-center bg-celeste-confetti"
            style={{ position: "relative", overflow: "hidden" }}
        >
            <nav className="navbar-morada">
                <div style={{ flex: 1 }}></div>
                <div style={{
                    flex: 1,
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    color: "#fff"
                }}>
                    {userEmail}
                </div>
                <button
                    className="navbar-btn-cerrar"
                    onClick={() => navigate("/login")}
                >
                    Cerrar sesión
                </button>
            </nav>
            <div style={{ height: "120px" }}></div>
            <div style={{ position: "absolute", top: "100px", left: "60px", zIndex: 2 }}>
                <Link to="/userpage" style={{ minWidth: "200px", textDecoration: "none" }}>
                    <button className="btn btn-rosado w-100">
                        Ir a chats
                    </button>
                </Link>
            </div>
            {/* Card principal que contiene el historial */}
            <div
                className="card p-5 shadow d-flex flex-column align-items-center w-100"
                style={{
                    maxWidth: "600px",
                    borderRadius: "32px",
                    backgroundColor: "#90caf9",
                    alignItems: "flex-start"
                }}
            >
                <h2 className="mb-4 text-center w-100" style={{ fontWeight: "bold", color: "#fff" }}>
                    Historial de preguntas recientes
                </h2>
                {preguntas.length === 0 ? (
                    <div className="card p-5 shadow d-flex flex-column align-items-center w-100"
                        style={{
                            maxWidth: "400px",
                            width: "100%",
                            margin: "0 auto",
                            fontSize: "1.1rem",
                            padding: "16px"
                        }}>
                        No hay preguntas recientes.
                    </div>
                ) : (
                    <div className="d-flex flex-column gap-3 w-100">
                        {preguntas.map((pregunta, idx) => (
                            <div
                                key={idx}
                                className="d-flex flex-column mb-3"
                                style={{
                                    borderRadius: "20px",
                                    backgroundColor: "#fff",
                                    fontSize: "1.2rem",
                                    fontWeight: "bold",
                                    color: "#444",
                                    padding: "16px 24px",
                                    width: "100%",
                                    textAlign: "left",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
                                }}
                            >
                                <div className="d-flex flex-row align-items-center">
                                    <span style={{
                                        color: "#fff",
                                        backgroundColor: pregunta.tema === "ciencia" ? "#FFD600" : "#43A047",
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
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Historial;