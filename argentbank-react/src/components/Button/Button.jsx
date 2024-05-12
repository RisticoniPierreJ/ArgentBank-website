import "./Button.css";

import PropTypes from "prop-types";

function Button({ className, text }) {
    return <button className={className}>{text}</button>;
}

// Validation de type PropTypes pour la prop className
Button.propTypes = {
    className: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

export default Button;
