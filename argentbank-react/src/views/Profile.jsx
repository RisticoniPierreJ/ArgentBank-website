import "./Profile.css";

import Transaction from "../components/Transaction/Transaction";
import Button from "../components/Button/Button";

function Profile() {
    return (
        <main className="main bg-dark">
            <div className="mainTop">
                <h1>
                    Welcome back
                    <br />
                    Tony Jarvis!
                </h1>
                <Button className="btn btnSmall" text="Edit Name" />
            </div>
            <h2 className="sr-only">Accounts</h2>
            <Transaction />
        </main>
    );
}

export default Profile;
