import React, { useRef, useEffect } from 'react';
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
            isDone: false,
            date: new Date().getTime()
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

    const setDate = (id: string, date: Date) => {
        todoFirebase.doc(id).update({
            date: date
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

    useEffect(function(){
        const checkTaskInterval = setInterval(() => {
            if(todoFirebaseTodos) {
                const dateNow = new Date().getTime();
                todoFirebaseTodos.forEach((item) => {
                    if(dateNow >= item.date - 60 * 1000 && dateNow < item.date) {
                        const message = 'Need to do task ' + item.text;
                        electron.notificationApi.sendNotification(message);
                    }
                })
            }
        }, 60000);

        // clear interval with unmount function
        return () => clearInterval(checkTaskInterval);

    }, [todoFirebaseTodos]);

    return (
        <>
            <header>
                My Planes <i className="material-icons planes-icon">airplanemode_active</i>
                <span className="user-name">{props.user.email}</span>
                <a className="sign-out-btn" onClick={() => props.auth.signOut()}>Sign Out</a>
            </header>
            <main>
                <ul>
                    {todoFirebaseTodos && todoFirebaseTodos.length < 1 &&  <span className="no-planes-text">No planes :) Yes, exactly planes</span>}
                    {todoFirebaseTodos ? todoFirebaseTodos.sort((a: any,b: any) =>{return a.date - b.date}).map((item: any) => {
                        return <Item
                                    date={item.date}
                                    key={item.id}
                                    id={item.id}
                                    text={item.text}
                                    isDone={item.isDone}
                                    removeItem={removeItem}
                                    setDate={setDate}
                                    setText={setText}
                                    setDoneStatus={setDoneStatus}
                                />
                    }) : <li>'Loading ...'</li>}
                </ul>
            </main>
            <div className="createTaskBlock">
                <div className="createTaskBlock-input">
                    <label htmlFor="title">Введите название дела</label>
                    <input
                        type="text"
                        ref={inputEl}
                        id="title"
                        onKeyPress={(e)=> {if(e.key === 'Enter') addItem()}}
                    />
                </div>
                <a className="add-task-btn btn waves-effect waves-light" onClick={addItem}>Add task</a>
            </div>
        </>
    )
}