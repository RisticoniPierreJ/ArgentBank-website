import "./EditForm.css";
import Button from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { changeUserName } from "../../features/user/userActions";
import { useState } from "react";
import PropTypes from "prop-types";

function EditForm({ toggleEditForm }) {
    const [newUserName, setnewUserName] = useState("");

    //importer les donnnées du store
    const { firstName, lastName, userName } = useSelector(
        (state) => state.user.user
    );
    const token = useSelector((state) => state.auth.token);

    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();

        if (newUserName.trim() === "") {
            toggleEditForm();
            return;
        }
        dispatch(changeUserName({ userName: newUserName, token }));
        toggleEditForm();
    };

    return (
        <form className="editForm" onSubmit={handleSubmit}>
            <h2>Edit User info</h2>
            <div className="formWrapper">
                <div className="editInput-wrapper">
                    <label htmlFor="UserName">User name</label>
                    <input
                        type="text"
                        id="UserName"
                        name="UserName"
                        placeholder={userName}
                        value={newUserName}
                        onChange={(e) => setnewUserName(e.target.value)}
                    />
                </div>

                <div className="editInput-wrapper">
                    <label htmlFor="FirstName">First Name</label>
                    <input
                        type="text"
                        id="FirstName"
                        name="FirstName"
                        placeholder={firstName}
                        disabled
                    />
                </div>

                <div className="editInput-wrapper">
                    <label htmlFor="LastName">Last Name</label>
                    <input
                        type="text"
                        id="LastName"
                        name="LastName"
                        placeholder={lastName}
                        disabled
                    />
                </div>

                <div className="button-wrapper">
                    <Button className="btn btnLarge" type={"submit"}>
                        Save
                    </Button>
                    <Button
                        className="btn btnLarge"
                        type={"button"}
                        onClick={toggleEditForm}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </form>
    );
}

EditForm.propTypes = {
    toggleEditForm: PropTypes.func.isRequired,
};

export default EditForm;
