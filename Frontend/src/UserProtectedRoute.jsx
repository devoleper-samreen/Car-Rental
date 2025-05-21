import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const UserProtectedRoute = ({ children }) => {
    const { userToken } = useSelector((state) => state.auth);

    if (!userToken) {
        return <Navigate to="/user/login" replace />;
    }

    return children;
};

export default UserProtectedRoute;
