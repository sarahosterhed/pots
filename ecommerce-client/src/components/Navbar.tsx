import { NavLink } from "react-router"

export const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><NavLink to={"/"}>Home</NavLink></li>
                <li><NavLink to={"/admin"}>Admin</NavLink></li>
                <li><NavLink to={"/cart"}>Cart</NavLink></li>
            </ul>
        </nav>
    )
}
