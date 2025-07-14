import React from "react";
import { Link } from "react-router-dom";

export const Userpage = () => {
    const cloudColor = "#6EC6F3";
    const yellowCard = "#FFE066";
    const greenCard = "#7ED957";

    return (
        <div className="container mt-5 d-flex flex-column align-items-center">
            {/* Card Ciencia - Amarillo */}
            <div
                className="card p-5 shadow mb-5 d-flex flex-row align-items-center justify-content-center"
                style={{
                    maxWidth: "700px",
                    minWidth: "700px",
                    minHeight: "400px",
                    maxHeight: "400px",
                    borderRadius: "40px",
                    backgroundColor: yellowCard,
                    aspectRatio: "1/1"
                }}
            >
                <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
                    <h2 style={{ fontWeight: "bold", color: "#444", fontSize: "2.5rem" }}>
                        Pregúntame sobre ciencia
                    </h2>
                    <Link to="/chatciencia" style={{ minWidth: "200px" }}>
                        <button
                            className="btn mt-4"
                            style={{
                                height: "70px",
                                fontSize: "1.7rem",
                                backgroundColor: cloudColor,
                                borderColor: cloudColor,
                                color: "#fff",
                                borderRadius: "20px",
                                fontWeight: "bold",
                                width: "100%"
                            }}
                        >
                            Ir al chat
                        </button>
                    </Link>
                </div>
            </div>
            {/* Card Historia - Verde */}
            <div
                className="card p-5 shadow d-flex flex-row align-items-center justify-content-center"
                style={{
                    maxWidth: "700px",
                    minWidth: "700px",
                    minHeight: "400px",
                    maxHeight: "400px",
                    borderRadius: "40px",
                    backgroundColor: greenCard,
                    aspectRatio: "1/1"
                }}
            >
                <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
                    <h2 style={{ fontWeight: "bold", color: "#222", fontSize: "2.5rem" }}>
                        Pregúntame sobre historia
                    </h2>
                    <Link to="/chathistoria" style={{ minWidth: "200px" }}>
                        <button
                            className="btn mt-4"
                            style={{
                                height: "70px",
                                fontSize: "1.7rem",
                                backgroundColor: cloudColor,
                                borderColor: cloudColor,
                                color: "#fff",
                                borderRadius: "20px",
                                fontWeight: "bold",
                                width: "100%"
                            }}
                        >
                            Ir al chat
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};