import { Link } from "react-router-dom"
import '../Styles/Components/Home-Nav.less';

export const HomeNav = () => {
    return (
        <div className="home-nav">
            <Link to={"/"}>
                <button>Quinvest</button>
            </Link>
            <Link to={"/signin"}>
                <button>
                    Sign In
                </button>
            </Link>
            <Link to={"/signup"}>
                <button>
                    Sign Up
                </button>
            </Link>
            <Link to={"/dashboard"}>
                <button>
                    Dashboard
                </button>
            </Link>
        </div>
    )
}