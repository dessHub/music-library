import { Link } from "react-router-dom";
import { MusicalNoteIcon } from "@heroicons/react/20/solid";

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-30 flex justify-center pt-2 pb-3 text-center bg-gray-900">
            <Link to="/" className="flex items-center text-3xl font-bold text-teal-500 hover:text-teal-300 underline"><MusicalNoteIcon className="h-6 w-7"  />Music Library</Link>
        </nav>
    )
}

export default Navbar;