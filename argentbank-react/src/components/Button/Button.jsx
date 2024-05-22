import "./Button.css";

import PropTypes from "prop-types";

function Button({ className, type, children, ...props }) {
    return (
        <button className={className} type={type} {...props}>
            {children}
        </button>
    );
}

Button.propTypes = {
    className: PropTypes.string.isRequired,
    type: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export default Button;
