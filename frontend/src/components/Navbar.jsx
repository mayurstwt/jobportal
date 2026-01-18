import { Link, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import  { logout } from "../features/auth/authslice";


export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login", {replace: true});
    }
    
    return (
         <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white">
            <Link to="/" className="text-xl font-bold">
                JobPortal
            </Link>

            <div className="flex gap-4 items-center">
                {!user && (
                    <Link to="/login" className="text-xl font-bold">
                        Login
                    </Link>
                )}

                {user?.role === "recruiter" && (
                    <Link to="/recruiter" className="text-xl font-bold">                    
                        Recruiter
                    </Link>
                )}

                {user?.role === "admin" && (
                    <Link to="/admin" className="text-xl font-bold">
                        Admin
                    </Link>
                )}

                {user && (
                    <button
                        onClick={handleLogout}
                        className="text-xl font-bold"
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>

    )
}