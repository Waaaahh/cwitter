import { auth } from "myBase";
import React from "react";
import { useHistory } from "react-router-dom";
const Profile = () => {
    const history = useHistory();
    const onLogOutClick = () => {
        auth.signOut();
        history.push("/");
    }
    return (
        <>
            <button onClick={onLogOutClick}>Log out</button>
        </>
    )
}
export default Profile