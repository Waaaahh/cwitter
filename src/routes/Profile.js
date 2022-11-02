import { auth } from "myBase";
import React from "react";
const Profile = () => {
    const onLogOutClick = () => auth.signOut();
    return (
        <>
            <button onClick={onLogOutClick}>Log out</button>
        </>
    )
}
export default Profile