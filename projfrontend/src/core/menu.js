import React,{Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/helper';

const currentTab = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#2ecc71" }
    } else {
        return { color: "#FFFFFF" }
    }
}
const Menu = ({ history }) => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand">Navbar</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item ">
                    <Link style={currentTab(history, "/")} to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item ">
                    <Link style={currentTab(history, "/cart")} to="/cart" className="nav-link">Cart</Link>
                </li>
                <li className="nav-item ">
                    <Link style={currentTab(history, "/user/dashboard")} to="/user/dashboard" className="nav-link">Dashboard</Link>
                </li>
                <li className="nav-item ">
                    <Link style={currentTab(history, "/admin/dashboard")} to="/admin/dashboard" className="nav-link">Admin Dashboard</Link>
                </li>
                {!isAuthenticated() && (
                    <Fragment>
                    <li className="nav-item ">
                        <Link style={currentTab(history, "/signup")} to="/signup" className="nav-link">Sign up</Link>
                    </li>
                    <li className="nav-item ">
                        <Link style={currentTab(history, "/signin")} to="/signin" className="nav-link">Signin</Link>
                    </li>
                    </Fragment>
                )}
                {isAuthenticated() && (
                    <li className="nav-item ">
                        <span className="nav-link text-warning" onClick={() => {
                            signout(() => {
                                history.push("/")
                            })
                        }}>
                            Signout
                        </span>
                    </li>
                )}

            </ul>
        </div>
    </nav>
)
export default withRouter(Menu);