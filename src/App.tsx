import React, { useState, useRef } from 'react';
import { Item } from './components/Item';
import { Auth } from './components/Auth';
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


export const App: React.FunctionComponent = () => {
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

    const setText = (id: string, text: string = 'changed text') => {
        todoFirebase.doc(id).update({
            text: text
        })
    }

    const setDoneStatus = (id: string, isDone: boolean) => {
        todoFirebase.doc(id).update({
            isDone: isDone
        })
    }

    const removeItem = (id: string = '1') => {
        todoFirebase.doc(id).delete();
    }

    const [user] = useAuthState(auth);
    return (
        <>
        {user ?
            <>
                <header>
                    My Planes <span className="user-name">{user.email}</span>
                </header>
                <main>
                    <ul>
                        {todoFirebaseTodos ? todoFirebaseTodos.map((item: any) => {
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
                    <div className="input-field">
                        <input
                            type="text"
                            ref={inputEl}
                            id="title"
                            onKeyPress={(e)=> {if(e.key === 'Enter') addItem()}}
                        />
                        <label htmlFor="title" className="active">Введите название дела</label>
                    </div>
                    <a className="btn waves-effect waves-light" onClick={addItem}>Add task</a>
                    <a className="btn waves-effect waves-light" onClick={() => auth.signOut()}>Sign Out</a>
                </div>
            </> :
            <>
                <Auth firestore={firestore} auth={auth}/>
            </>
        }
        </>
    )
}