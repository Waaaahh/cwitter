import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { fireStore } from "myBase";
import React, {useEffect, useState} from "react";
const Home =({ userObj }) => {
    console.log(userObj)
    const [cweet, setCweet] = useState("");
    const [cweets, setCweets] = useState([]);
    const getCweet = async () => {
        const cweetData = await getDocs(query(collection(fireStore, "cweets")))
        cweetData.forEach((document) => {
            const cweetDocument = {
                ...document.data(),
                id: document.id,
                createdId: userObj.uid,
            }
            setCweets((prev) => [cweetDocument, ...prev])
        })
    }
    useEffect(() => {
        getCweet();
        onSnapshot(query(collection(fireStore, "cweets"), orderBy('createdAt', 'desc')), (querySnapshot) => {
            const cweetArr = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setCweets(cweetArr);
        } )
        
    }, [])
    const onSubmit = async (event) => {
        console.log(event)
        event.preventDefault();
        const docRef = await addDoc(
        collection(fireStore,"cweets"),
        {
            text: cweet,
            createdAt: Date.now(),
            createdId: userObj.uid,
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
    console.log("cweets")
    console.log("cwee"+cweets)
    return (
        <div className="container">
            <form onSubmit={onSubmit}>
                <input value={cweet} type="text" placeholder="What's on your mind?" maxLength={120} onChange={onChange}/>
                <input type="submit" value="cwit"  />
            </form>
            <div>
                { cweets.map((cweet) => (
                    <div key={cweet.id}>
                        <h4>{cweet.text}</h4>
                    </div>
                )) }
            </div>
        </div>
    )
}
export default Home;