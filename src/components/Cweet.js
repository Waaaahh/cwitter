import { deleteDoc, deleteField, doc, query, updateDoc } from 'firebase/firestore';
import { fireStore } from 'myBase';
import { useState } from 'react'
import React from 'react'
import { deleteObject, ref } from 'firebase/storage';

const Cweet = ({cweetObj, isOwner}) => {
    const [newCweet, setNewCweet] = useState(cweetObj.text)
    const [editing, setEditing] = useState(false)
    const onDeleteClick = async () => {
        console.log(cweetObj)
        const ok = window.confirm("Are you sure want to delete this cweet");
        const doccument = doc(fireStore, `cweets/${cweetObj.id}`)
        if(ok) {
            await deleteDoc(doccument);
            const fileRef = await ref(fireStore, cweetObj.attachmentUrl);
            await deleteObject(fileRef);

        }
    };
    const toggleEditing = () => setEditing((prev) => !prev)
    const onChange = (event) => {
        const {target: {value}} = event;
        setNewCweet(value);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        console.log(cweetObj, newCweet)
        const document = doc(fireStore, `cweets/${cweetObj.id}`)
        await updateDoc(document, {
            text: newCweet,
        });

        setEditing(false);
    }
    return (
        <div>
            {
                editing ? (<><form onSubmit={onSubmit}><input value={newCweet} onChange={onChange} required /><input type="submit" value="Update Cweet" /></form>
                <button onClick={toggleEditing}>Cancel</button></>) :  ( 
                <>
                    <h4>{cweetObj.text}</h4>
                    {cweetObj.attachmentUrl && <img src={cweetObj.attachmentUrl} width="50px" height="50px" />}

                {isOwner && (
                    <>
                 <button onClick={onDeleteClick}>Delete Cweet</button>
                 <button onClick={toggleEditing}>Edit Cweet</button>
                 </>
                 )}
                 </>)
            }
           
    </div>
)
       }
export default Cweet;