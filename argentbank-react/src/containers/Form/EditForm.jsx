import { useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import "./EditForm.css";

function EditForm() {
    const { firstName, lastName, userName } = useSelector(
        (state) => state.user.user
    );

    return (
        <form className="editForm">
            <h2>Edit User info</h2>
            <div className="editInput-wrapper">
                <label htmlFor="UserName">User name</label>
                <input
                    type="text"
                    id="UserName"
                    name="UserName"
                    placeholder={userName}
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
                <Button className="btn btnLarge" type={"submit"}>
                    Cancel
                </Button>
            </div>
        </form>
    );
}

export default EditForm;
