import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Celeste más oscuro
    const cloudColor = "#6EC6F3";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (email && password) {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });
                const data = await response.json();
                if (response.ok) {
                    // Cuando el login es exitoso:
                    localStorage.setItem("userEmail", email);
                    navigate("/userpage");
                } else {
                    setError(data.msg || "Usuario o contraseña incorrectos");
                }
            } catch (err) {
                setError("Error de conexión con el servidor.");
            }
        } else {
            setError("Usuario o contraseña incorrectos");
        }
    };

    return (
        <div
            className="d-flex flex-column align-items-center justify-content-center vh-100 bg-celeste-confetti"
            style={{
                width: "100vw",
                minHeight: "100vh",
                position: "relative",
                overflow: "hidden"
            }}
        >
            <div className="card p-5 shadow w-100" style={{
                maxWidth: "480px",
                borderRadius: "40px",
                backgroundColor: "#fff",
                zIndex: 1,
                boxSizing: "border-box"
            }}>
                <h2 className="mb-4 text-center" style={{ fontWeight: "bold", color: cloudColor, fontSize: "2.5rem" }}>Iniciar sesión</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="loginEmail" className="form-label" style={{ fontSize: "1.2rem" }}> Tu email </label>
                        <input
                            type="email"
                            className="form-control"
                            id="loginEmail"
                            placeholder=""
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            style={{ borderRadius: "20px", fontSize: "1.1rem" }}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="loginPassword" className="form-label" style={{ fontSize: "1.2rem" }}> Tu contraseña </label>
                        <input
                            type="password"
                            className="form-control"
                            id="loginPassword"
                            placeholder=""
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            style={{ borderRadius: "20px", fontSize: "1.1rem" }}
                        />
                    </div>
                    <div className="mb-4 form-check">
                        <input type="checkbox" className="form-check-input" id="loginCheck" />
                        <label className="form-check-label" htmlFor="loginCheck" style={{ fontSize: "1.1rem" }}>
                            Recuérdame
                        </label>
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button
                        type="submit"
                        className="btn w-100"
                        style={{
                            height: "70px",
                            fontSize: "2rem",
                            backgroundColor: cloudColor,
                            borderColor: cloudColor,
                            color: "#fff",
                            borderRadius: "20px",
                            fontWeight: "bold"
                        }}
                    >
                        Sign in
                    </button>
                </form>
                <div className="text-center mt-4" style={{ fontSize: "1.1rem" }}>
                    Si no tienes cuenta, pide ayuda a un adulto y haz click{" "}
                    <Link to="/signup" style={{ color: cloudColor, fontWeight: "bold", textDecoration: "underline" }}>
                        aquí
                    </Link>
                </div>
            </div>
        </div>
    );
};