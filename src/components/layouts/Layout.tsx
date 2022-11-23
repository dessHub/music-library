import Navbar from "../atoms/Navbar";
type Props = {
    children: JSX.Element;
}

const Layout = ({children}: Props) => {

    return (
        <div className="w-full">
            <Navbar />

            <div className="w-full">
                {children}
            </div>
        </div>
    )
}

export default Layout;