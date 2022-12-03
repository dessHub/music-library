import Navbar from "../atoms/Navbar";
type Props = {
    children: JSX.Element;
}

const Layout = ({children}: Props) => {

    return (
        <div className="bg-gray-800 w-full relative">
            <Navbar />

            <div className="w-full pt-16">
                {children}
            </div>
        </div>
    )
}

export default Layout;