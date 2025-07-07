import React from "react";

export const Login = () => (
    <div className="container mt-5">
        <h2>Iniciar sesión</h2>
        <form className="card p-4" style={{ maxWidth: "400px", margin: "0 auto" }}>
            <div className="mb-3">
                <label htmlFor="loginEmail" className="form-label">Email address</label>
                <input type="email" className="form-control" id="loginEmail" placeholder="email@example.com" />
            </div>
            <div className="mb-3">
                <label htmlFor="loginPassword" className="form-label">Password</label>
                <input type="password" className="form-control" id="loginPassword" placeholder="Password" />
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="loginCheck" />
                <label className="form-check-label" htmlFor="loginCheck">
                    Remember me
                </label>
            </div>
            <button type="submit" className="btn btn-primary w-100">Sign in</button>
        </form>
    </div>
);