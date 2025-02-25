import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import  "./css/Logout.css"
const Logout = () => {
    const navigate = useNavigate();

    useEffect(() =>  {
        // Remove user session from localStorage
        localStorage.removeItem("user");
        localStorage.clear(); 
    
        // Prevent back and forward navigation
        window.history.pushState(null, "", window.location.href);
        window.history.forward(); // Prevent forward navigation
    
        window.onpopstate = () => {
            window.history.pushState(null, "", window.location.href);
            window.history.forward();
        };
    
        // Redirect to login page
        navigate("/login", { replace: true });
    }, [navigate]);

    return null;
};

export default Logout;
