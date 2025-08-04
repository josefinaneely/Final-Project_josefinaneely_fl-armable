import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Userpage = () => {
    const cloudColor = "#6EC6F3";
    const yellowCard = "#FFF9C4";
    const greenCard = "#A6E9B4";

    const navigate = useNavigate();
    const userEmail = localStorage.getItem("userEmail");

    return (
        <div
            className="d-flex flex-column align-items-center justify-content-center vh-100 bg-celeste-confetti"
            style={{
                position: "relative",
                overflow: "hidden",
                width: "100vw",
                minHeight: "100vh"
            }}
        >
            {/* Navbar centrada con mail y botón cerrar sesión */}
            <nav className="navbar-morada w-100">
                <button
                    className="navbar-btn-izq"
                    onClick={() => navigate("/historial")}
                >
                    Historial
                </button>
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
            <div style={{ height: "60px" }}></div>
            {/* Cards en columna para móvil y en fila para escritorio */}
            <div className="container-fluid px-2">
                <div className="row justify-content-center gap-4">
                    <div className="col-12 col-md-6 d-flex">
                        <div
                            className="card p-4 shadow flex-grow-1 d-flex flex-column align-items-center justify-content-center mb-4"
                            style={{
                                borderRadius: "32px",
                                backgroundColor: yellowCard,
                                minHeight: "280px",
                                maxWidth: "100%",
                                width: "100%"
                            }}
                        >
                            <h2 style={{ fontWeight: "bold", color: "#444", fontSize: "2rem", textAlign: "center" }}>
                                Pregúntame sobre ciencia
                            </h2>
                            <Link to="/chatciencia" style={{ width: "100%" }}>
                                <button
                                    className="btn mt-4 w-100"
                                    style={{
                                        height: "56px",
                                        fontSize: "1.3rem",
                                        backgroundColor: cloudColor,
                                        borderColor: cloudColor,
                                        color: "#fff",
                                        borderRadius: "20px",
                                        fontWeight: "bold"
                                    }}
                                >
                                    Ir al chat
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 d-flex">
                        <div
                            className="card p-4 shadow flex-grow-1 d-flex flex-column align-items-center justify-content-center mb-4"
                            style={{
                                borderRadius: "32px",
                                backgroundColor: greenCard,
                                minHeight: "280px",
                                maxWidth: "100%",
                                width: "100%"
                            }}
                        >
                            <h2 style={{ fontWeight: "bold", color: "#222", fontSize: "2rem", textAlign: "center" }}>
                                Pregúntame sobre historia
                            </h2>
                            <Link to="/chathistoria" style={{ width: "100%" }}>
                                <button
                                    className="btn mt-4 w-100"
                                    style={{
                                        height: "56px",
                                        fontSize: "1.3rem",
                                        backgroundColor: cloudColor,
                                        borderColor: cloudColor,
                                        color: "#fff",
                                        borderRadius: "20px",
                                        fontWeight: "bold"
                                    }}
                                >
                                    Ir al chat
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};