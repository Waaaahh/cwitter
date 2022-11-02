import { addDoc, collection } from "firebase/firestore";
import { fireStore } from "myBase";
import React, {useState} from "react";
const Home =() => {
    const [cweet, setCweet] = useState("");
    const onSubmit = async (event) => {
        console.log(event)
        event.preventDefault();
        const docRef = await addDoc(
        collection(fireStore,"cweets"),
        {
            cweet,
            createdAt: Date.now()
        });
        setCweet("");
    }
    const onChange = (event) => {
        console.log(event)
        const {
            target: {
                value
            }
        } = event;
        setCweet(value)
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={cweet} type="text" placeholder="What's on your mind?" maxLength={120} onChange={onChange}/>
                <input type="submit" value="cwit"  />
            </form>
        </div>
    )
}
export default Home;