import React, { useState } from "react";

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

const Chathistoria = () => {
    const cloudColor = "#6EC6F3";
    const greenCard = "#A6E9B4";

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
    };

    return (
        <div
            className="d-flex flex-column align-items-center justify-content-center vh-100 bg-celeste-confetti"
            style={{
                position: "relative",
                overflow: "hidden"
            }}
        >
            <div className="card-custom card-historia p-5 shadow d-flex flex-column align-items-center justify-content-center">
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
                {/* Área de respuesta con alto fijo y scroll */}
                <div
                    className="respuesta-clarifai"
                    dangerouslySetInnerHTML={{ __html: answerStyle(answer) }}
                />
            </div>
        </div>
    );
};

export default Chathistoria;