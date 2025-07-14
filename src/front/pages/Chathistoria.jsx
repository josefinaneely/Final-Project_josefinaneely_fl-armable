import React, { useState } from "react";

const Chathistoria = () => {
    const cloudColor = "#6EC6F3";
    const greenCard = "#7ED957";
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
        <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
            <div
                className="card p-5 shadow d-flex flex-column align-items-center justify-content-center"
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
                <h2 className="mb-4 text-center" style={{ fontWeight: "bold", color: "#222", fontSize: "2.5rem" }}>
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
                            maxWidth: "400px",
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
                {answer && (
                    <div className="mt-4 alert alert-success w-100 text-center" style={{ fontSize: "1.2rem", borderRadius: "20px" }}>
                        {answer}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chathistoria;