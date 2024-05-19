import "./Profile.css";

import Transaction from "../components/Transaction/Transaction";
import Button from "../components/Button/Button";
import { useSelector } from "react-redux";

function Profile() {
    const { user } = useSelector((state) => state.user);

    return (
        <main className="main bg-dark">
            <div className="mainTop">
                <h1>
                    Welcome back
                    <br />
                    {user.firstName} {user.lastName} !
                </h1>
                <Button className="btn btnSmall" text="Edit Name" />
            </div>
            <h2 className="sr-only">Accounts</h2>
            <Transaction />
        </main>
    );
}

export default Profile;
