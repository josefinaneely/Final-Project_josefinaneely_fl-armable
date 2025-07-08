import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Aquí deberías hacer la petición a tu API para autenticar
        // Este ejemplo asume éxito si el email no está vacío
        if (email && password) {
            // Si el usuario existe, redirige a /userpage
            navigate("/userpage");
        } else {
            setError("Usuario o contraseña incorrectos");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Iniciar sesión</h2>
            <form className="card p-4" style={{ maxWidth: "400px", margin: "0 auto" }} onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="loginEmail" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="loginEmail"
                        placeholder="email@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="loginPassword" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="loginPassword"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="loginCheck" />
                    <label className="form-check-label" htmlFor="loginCheck">
                        Remember me
                    </label>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary w-100">Sign in</button>
            </form>
        </div>
    );
};