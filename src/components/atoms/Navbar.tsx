import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="py-2 text-center mb-5">
            <Link to="/" className="text-3xl font-bold text-teal-500 hover:text-teal-300">Music Library</Link>
        </nav>
    )
}

export default Navbar;