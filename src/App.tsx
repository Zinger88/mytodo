import React, { useRef } from 'react';
import { Item } from './components/Item';
import { useCollectionData } from 'react-firebase-hooks/firestore';
interface AppProps {
    user: any,
    firestore: any
    auth: any
}

export const App: React.FunctionComponent<AppProps> = (props) => {
    const inputEl = useRef(null);
    const todoFirebase = props.firestore.collection(props.user.email);
    const [todoFirebaseTodos] = useCollectionData(todoFirebase, {idField: 'id'});
    
    const addItem = () => {
        const inputRef = inputEl.current;
        todoFirebase.add({
            text: inputRef.value,
            isDone: false
        });
        const message = 'Add new task - ' + inputRef.value; 
        electron.notificationApi.sendNotification(message);
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

    return (
        <>
            <header>
                My Planes <i className="fas fa-plane"></i>
                <span className="user-name">{props.user.email}</span>
                <a className="sign-out-btn" onClick={() => props.auth.signOut()}>Sign Out</a>
            </header>
            <main>
                <ul>
                    {todoFirebaseTodos && todoFirebaseTodos.length < 1 &&
                        <span className="no-planes-text">No planes :) Yes, exactly planes</span>
                    }
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
            </div>
        </> 
    )
}