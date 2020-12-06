import React, { useState, useRef } from 'react';
import { Item } from './components/Item';
import firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyBGP7tMrPGmGtb9HCQvztkOtIzM4w9zFs4",
    authDomain: "todo-desktop-dbc2d.firebaseapp.com",
    databaseURL: "https://todo-desktop-dbc2d.firebaseio.com",
    projectId: "todo-desktop-dbc2d",
    storageBucket: "todo-desktop-dbc2d.appspot.com",
    messagingSenderId: "909466469260",
    appId: "1:909466469260:web:eef9dbb1a8895044c30ca9",
    measurementId: "G-E1E8L5ERRC"
});

const auth = firebase.auth();
const firestore = firebase.firestore();


export const App = function() {
    const inputEl = useRef(null);
    const todoFirebase = firestore.collection('todolist');
    const [todoFirebaseTodos] = useCollectionData(todoFirebase, {idField: 'id'});

    const addItem = () => {
        const inputRef = inputEl.current;
        todoFirebase.add({
            text: inputRef.value,
            isDone: false
        });
        inputRef.value = '';
    }

    const setText = (id, text = 'changed text') => {
        todoFirebase.doc(id).update({
            text: text
        })
    }

    const setDoneStatus = (id, isDone) => {
        todoFirebase.doc(id).update({
            isDone: isDone
        })
    }

    const removeItem = (id = 1) => {
        todoFirebase.doc(id).delete();
    }

    const [user] = useAuthState(auth);

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }

    return (
        <>
            {/*user*/ true ?
            <>
                <header>
                    My Planes
                </header>
                <main>
                    <ul>
                        {todoFirebaseTodos ? todoFirebaseTodos.map(item => {
                            return <Item
                                        key={item.id}
                                        id={item.id}
                                        text={item.text}
                                        isDone={item.isDone}
                                        removeItem={removeItem}
                                        setText={setText}
                                        setDoneStatus={setDoneStatus}
                                    />
                        }) : <li>'Loading ...'</li>}
                    </ul>
                </main>
                <div className="createTaskBlock">
                    <div className="createTaskBlock-input">
                        <input
                            type="text"
                            ref={inputEl}
                            placeholder="Write Text Here"
                            onKeyPress={(e)=> {if(e.key === 'Enter') addItem()}}
                        />
                    </div>
                    <button onClick={addItem}>Add task</button>
                </div>
            </> :
            <>
                Autification
                <button onClick={signInWithGoogle}>Sign in with Google</button>
                <button onClick={() => auth.signOut()}>Sign Out</button>
            </>
            }
        </>
    )
}