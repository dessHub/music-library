import { Link } from "react-router-dom";
import { MusicalNoteIcon } from "@heroicons/react/20/solid";

const Navbar = () => {
    return (
        <nav className="flex justify-center pt-2 pb-3 text-center bg-gray-100">
            <Link to="/" className="flex items-center text-3xl font-bold text-teal-500 hover:text-teal-300 underline"><MusicalNoteIcon className="h-6 w-7"  />Music Library</Link>
        </nav>
    )
}

export default Navbar;