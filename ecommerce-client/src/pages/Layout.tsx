import { Outlet, useLocation } from "react-router"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { Header } from "../components/Start/Header"

export const Layout = () => {
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    return (
        <>
            <header>
                <Navbar />
                {isHomePage &&
                    <Header />
                }
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    )
}
