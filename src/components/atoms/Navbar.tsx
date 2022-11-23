import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="pt-2 pb-3 text-center bg-gray-100">
            <Link to="/" className="text-3xl font-bold text-teal-500 hover:text-teal-300">Music Library</Link>
        </nav>
    )
}

export default Navbar;