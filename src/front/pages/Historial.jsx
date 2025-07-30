import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Historial = () => {
    const [preguntas, setPreguntas] = useState([]);
    const navigate = useNavigate();
    const userEmail = localStorage.getItem("userEmail");

    useEffect(() => {
        const userEmail = localStorage.getItem("userEmail");
        const key = `historialPreguntas_${userEmail}`;
        const historialGuardado = JSON.parse(localStorage.getItem(key)) || [];
        setPreguntas(historialGuardado.slice(-6).reverse());
    }, []);


    return (
        <div
            className="vh-100 d-flex flex-column align-items-center justify-content-center bg-celeste-confetti"
            style={{ position: "relative", overflow: "hidden" }}
        >
            {/* Navbar solo con botón cerrar sesión */}
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
            {/* Botón para volver a los chats */}
            <div style={{ position: "absolute", top: "100px", left: "60px", zIndex: 2 }}>
                <Link to="/userpage" style={{ minWidth: "200px", textDecoration: "none" }}>
                    <button className="btn btn-rosado">
                        Ir a chats
                    </button>
                </Link>
            </div>
            {/* Card que contiene el historial */}
            <div
                className="card p-5 shadow d-flex flex-column align-items-center w-100"
                style={{
                    maxWidth: "600px",
                    borderRadius: "32px",
                    backgroundColor: "#90caf9", // celeste más oscuro
                    alignItems: "flex-start" // alinear contenido a la izquierda
                }}
            >
                <h2 className="mb-4 text-center w-100" style={{ fontWeight: "bold", color: "#fff" }}>
                    Historial de preguntas recientes
                </h2>
                {preguntas.length === 0 ? (
                    <div className="card-custom card-historia p-4 mb-3 w-100 text-center text-muted">
                        No hay preguntas recientes.
                    </div>
                ) : (
                    preguntas.map((pregunta, idx) => (
                        <div
                            key={idx}
                            className="d-flex flex-row align-items-center mb-3"
                            style={{
                                borderRadius: "20px",
                                backgroundColor: "transparent", // Sin fondo blanco
                                fontSize: "1.6rem",
                                fontWeight: "bold",
                                color: "#444",
                                padding: "16px 24px",
                                width: "100%",
                                textAlign: "left"
                            }}
                        >
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
                            <span style={{ flex: 1 }}>{pregunta.texto}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Historial;