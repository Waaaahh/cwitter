import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { fireStore } from "myBase";
import React, {useEffect, useState} from "react";
import Cweet from '../components/Cweet'
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { v4 } from "uuid";
const Home =({ userObj }) => {
    console.log(userObj)
    const [cweet, setCweet] = useState("");
    const [cweets, setCweets] = useState([]);
    const [attachment, setAttachment] = useState("");
    const getCweet = async () => {
        const cweetData = await getDocs(query(collection(fireStore, "cweets")))
        cweetData.forEach((document) => {
            const cweetDocument = {
                ...document.data(),
                id: document.id,
                creatorId: userObj.uid,
                attachmentUrl : document.attachmentUrl,
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
        event.preventDefault();
        
        let attachmentUrl = ""
        if(attachment !== "") {
            const storage = getStorage();
            const imageRef = ref(storage, `${userObj.uid}/${v4()}`);
            const response = await uploadString(imageRef, attachment, "data_url").then(async (snapshot) => {
                console.log(snapshot)
                attachmentUrl = await getDownloadURL(snapshot.ref)
            });            
        }

        const cweetObj = {
            text: cweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        }

        console.log(cweetObj)

        const docRef = await addDoc(
        collection(fireStore,"cweets"),
        cweetObj);

        setCweet("");
        setAttachment("");

        document.getElementById("cweetImage").value = ""

    }
    const onChange = (event) => {
        const {
            target: {
                value
            }
        } = event;
        setCweet(value)
    }
    const onFileChange = (event) => {
        const {target: {files},} = event;
        const theFile = files[0]
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: {
                    result
                }
            } =finishedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);
    }
    const onClearAttachment = () => setAttachment("");
    return (
        <div className="container">
            <form onSubmit={onSubmit}>
                <input value={cweet} type="text" placeholder="What's on your mind?" maxLength={120} onChange={onChange}/>
                <input type="file" accept="image/*" onChange={onFileChange} id="cweetImage"/>
                <input type="submit" value="cwit"  />
                {attachment && 
                (
                <div>
                    <img src={attachment} width="50px" height="50px" />
                    <button onClick={onClearAttachment}>Clear</button>
                </div>)}

            </form>
            <div>
                { cweets.map((cweetObj) => (
                        <Cweet key={cweetObj.id} cweetObj={cweetObj} isOwner={cweetObj.creatorId === userObj.uid}/>
                    // <cweet key={cweet.id} cweetObj={cweet} isOwner={cweet.creatorId === userObj.uid}></cweet>
                )) }
            </div>
        </div>
    )
}
export default Home;