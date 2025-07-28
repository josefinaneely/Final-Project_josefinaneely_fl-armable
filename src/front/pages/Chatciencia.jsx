import React, { useState } from "react";

const Chatciencia = () => {
    const cloudColor = "#6EC6F3";
    const yellowCard = "#FFF9C4"; // amarillo suave, igual que en Userpage.jsx

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

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
                body: JSON.stringify({ question })
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
    };

    return (
        <div
            className="d-flex flex-column align-items-center justify-content-center vh-100 bg-celeste-confetti"
            style={{
                position: "relative",
                overflow: "hidden"
            }}
        >
            <div
                className="card p-5 shadow d-flex flex-column align-items-center justify-content-center"
                style={{
                    maxWidth: "900px",
                    minWidth: "900px",
                    minHeight: "600px",
                    maxHeight: "600px",
                    borderRadius: "40px",
                    backgroundColor: yellowCard,
                    aspectRatio: "1/1",
                    zIndex: 1
                }}
            >
                <h2 className="mb-4 text-center" style={{ fontWeight: "bold", color: "#444", fontSize: "2.5rem" }}>
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
                            maxWidth: "500px",
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
                        {loading ? "Consultando..." : "Preguntar"}
                    </button>
                </form>
                <div className="respuesta-clarifai">
                    {answer}
                </div>
            </div>
        </div>
    );
};

export default Chatciencia;