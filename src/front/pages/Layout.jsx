import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

// Base component que mantiene la navbar y el footer en toda la página y la funcionalidad de scroll to top.
// Adaptado para todo tipo de dispositivos usando contenedores fluidos y clases Bootstrap.
export const Layout = () => {
    return (
        <ScrollToTop>
            <div className="d-flex flex-column min-vh-100 w-100" style={{ minWidth: 0 }}>
                <Navbar />
                <main className="flex-grow-1 w-100" style={{ minWidth: 0 }}>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </ScrollToTop>
    );
};