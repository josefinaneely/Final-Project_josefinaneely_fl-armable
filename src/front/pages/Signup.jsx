import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const cloudColor = "#6EC6F3";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Aquí deberías hacer la petición a tu API para crear el usuario
        if (email && password && name) {
            setSuccess("Cuenta creada exitosamente");
            setTimeout(() => navigate("/login"), 1800);
        } else {
            setError("Por favor completa todos los campos.");
        }
    };

    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
            <div className="card p-5 shadow" style={{ maxWidth: "480px", width: "100%", borderRadius: "40px", backgroundColor: "#fff" }}>
                <h2 className="mb-4 text-center" style={{ fontWeight: "bold", color: cloudColor, fontSize: "2.5rem" }}>Crear cuenta</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="signupName" className="form-label" style={{ fontSize: "1.2rem" }}>Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            id="signupName"
                            placeholder=""
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            style={{ borderRadius: "20px", fontSize: "1.1rem" }}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="signupEmail" className="form-label" style={{ fontSize: "1.2rem" }}>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="signupEmail"
                            placeholder=""
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            style={{ borderRadius: "20px", fontSize: "1.1rem" }}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="signupPassword" className="form-label" style={{ fontSize: "1.2rem" }}>Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="signupPassword"
                            placeholder=""
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            style={{ borderRadius: "20px", fontSize: "1.1rem" }}
                        />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && (
                        <div
                            className="alert alert-success text-center"
                            style={{
                                fontSize: "1.2rem",
                                borderRadius: "20px",
                                backgroundColor: cloudColor,
                                color: "#fff",
                                fontWeight: "bold"
                            }}
                        >
                            {success}
                        </div>
                    )}
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
                        Crear cuenta
                    </button>
                </form>
            </div>
        </div>
    );
};