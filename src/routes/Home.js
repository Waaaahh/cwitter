import { addDoc, collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { fireStore } from "myBase";
import React, {useEffect, useState} from "react";
const Home =() => {
    const [cweet, setCweet] = useState("");
    const [cweets, setCweets] = useState("");
    const getCweet = async () => {
        const cweetData = await getDocs(query(collection(fireStore, "cweets")))
        cweetData.forEach((document) => {
            const cweetDocument = {
                ...document.data(),
                id: document.id,
            }
            setCweets((prev) => [cweetDocument, ...prev])
        })
    }
    useEffect(() => {
        getCweet()
    }, [])
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
    console.log(cweets)
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