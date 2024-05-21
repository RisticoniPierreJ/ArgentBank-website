import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

function ProtectedRoute({ redirectPath = "/", children }) {
    const { isAuthenticated } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to={redirectPath} />;
    }
    return children;
}

ProtectedRoute.propTypes = {
    redirectPath: PropTypes.string,
    children: PropTypes.node,
};

export default ProtectedRoute;
