import { Link } from "react-router-dom";

export const Landingpage = () => {
    const cloudColor = "#6EC6F3"; // Azul claro

    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-celeste-confetti" style={{ width: "100vw", minHeight: "100vh" }}>
            {/* Logo y botón en un contenedor responsive */}
            <div
                className="mb-5"
                style={{
                    width: "100%",
                    maxWidth: "600px",
                    padding: "24px",
                    boxSizing: "border-box"
                }}
            >
                <img
                    src="/logoo.jpg"
                    alt="Logo Lets"
                    className="logoo"
                    style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "contain",
                        backgroundColor: "#fff",
                        borderRadius: "40px"
                    }}
                />
                {/* Botón de acceso al login alineado con el logo */}
                <Link to="/login" style={{ width: "100%", display: "block" }}>
                    <button
                        className="btn btn-lg w-100 mt-4"
                        style={{
                            height: "70px",
                            fontSize: "2rem",
                            backgroundColor: cloudColor,
                            borderColor: "#fff",
                            color: "#fff",
                            borderWidth: "3px",
                            borderRadius: "24px"
                        }}
                    >
                        Entrar
                    </button>
                </Link>
            </div>
        </div>
    );
};










