import React, { useState } from 'react'
import {createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth'
import {auth} from 'myBase'
const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        console.log(event)
        const {target: {name, value}} = event;
        if(name === "email") {
            setEmail(value);
        } else if(name === "password") {
            setPassword(value);
        }
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
        if(newAccount) {
            const data = await createUserWithEmailAndPassword(
                auth, email, password
                )
        } else {
            const data = await signInWithEmailAndPassword(
                auth, email, password
            )
        }
    } catch (error) {
        console.log(error)
        setError(error.message)
    }
    };

    const toggleAccount = (prev) => {
        setNewAccount(!prev)
    }
    const onSocialClick = async (event) => {
        console.log(event)
        const {
            target: { name }
        } = event;
        let provider
        if(name === "google") {
            provider = new GoogleAuthProvider();
        } else if(name === "github") {
            provider = new GithubAuthProvider();
        }
        const data = await signInWithPopup(auth, provider);
        console.log(data)
    } 
    return (<div>
        <form onSubmit={onSubmit}>
            <input type="text" placeholder='Email' name="email" required value={email} onChange={onChange}/>
            <input type="password" placeholder="Password" name="password" required value={password} onChange={onChange}/>
            <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
            {error}
        </form>
        <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"} </span>
        <div>
            <button name="google" onClick={onSocialClick}>Continue with Google</button>
            <button name="github" onClick={onSocialClick}>Continue with Github</button>
        </div>
    </div>)
}
export default Auth;