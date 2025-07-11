import { Link } from "react-router-dom";

export const Landingpage = () => {
    // Cambia este color por el color exacto de la nube de tu logo si es diferente
    const cloudColor = "#6EC6F3"; // Ejemplo: azul claro, reemplaza por el color real de tu logo

    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
            {/* Logo rectangular con bordes muy redondeados */}
            <div className="mb-5" style={{ width: "480px" }}>
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
                <Link to="/login" style={{ width: "100%" }}>
                    <button
                        className="btn btn-lg w-100 mt-4"
                        style={{
                            height: "70px",
                            fontSize: "2rem",
                            backgroundColor: cloudColor,
                            borderColor: cloudColor,
                            color: "#fff"
                        }}
                    >
                        Entrar
                    </button>
                </Link>
            </div>
        </div>
    );
};










