import "./Profile.css";

import Transaction from "../components/Transaction/Transaction";
import Button from "../components/Button/Button";
import { useSelector } from "react-redux";
import EditForm from "../containers/Form/EditForm";
import { useState } from "react";

function Profile() {
    const { user } = useSelector((state) => state.user);
    const [isEditing, setIsEditing] = useState(false);

    const toggleEditForm = () => {
        setIsEditing(!isEditing);
    }

    return (
        <main className="main bg-dark">
            <div className="mainTop">
                <h1>
                    Welcome back
                    <br />
                    {user.firstName} {user.lastName} !
                </h1>
                {isEditing ? (
                    <EditForm toggleEditForm={toggleEditForm}/>
                ) : (
                    <Button className="btn btnSmall" onClick={toggleEditForm}>Edit Name</Button>
                )}
            </div>
            <h2 className="sr-only">Accounts</h2>
            <Transaction />
        </main>
    );
}

export default Profile;
