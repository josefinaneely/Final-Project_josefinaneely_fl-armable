import { Link } from "react-router-dom";

export const Landingpage = () => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
            {/* Logo */}
            <div className="mb-5">
                <img
                    src="/logo-x.png" // Cambia la ruta si tu logo está en otra ubicación
                    alt="Logo X"
                    style={{ width: "120px", height: "120px" }}
                />
            </div>




            {/* Botón de acceso al login */}
            <Link to="/login" style={{ width: "80%" }}>
                <button className="btn btn-primary btn-lg w-100">
                    Login
                </button>
            </Link>
        </div>
    );
};










