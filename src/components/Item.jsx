import React, { useState } from 'react';

export const Item = (props) => {
    const [text, changeText] = useState(props.text);
    const [editing, setEditing] = useState(false);
    const [time, setTime] = useState(false);
    const [isDone, setDoneStatus] = useState(props.isDone);

    const removeItemHandler = () => {
        props.removeItem(props.id);
    }

    const setDoneStatusHandler = () => {
        setDoneStatus(!isDone);
        props.setDoneStatus(props.id, !isDone);
    }

    const clickOnTextToEdit = () => {
        setEditing(true);
        if(time) {
            clearTimeout(time);
        }
        setTime(setTimeout(() => {
            setEditing(false);
        },5000));
    }

    const changeInput = (event) => {
        const lastText = event.target.value;
        changeText(lastText);
        if(time) {
            clearTimeout(time);
        }
        setTime(setTimeout(() => {
            setEditing(false);
            if(text !== props.text) {
                props.setText(props.id, lastText);
            }
        },5000));
    }

    const setText = () => {
        setEditing(false);
        props.setText(props.id, text);
    }

    return (
        <li id={props.id} className='item' key={props.id}>
            <input
                value={text}
                onChange={changeInput}
                className="item-edit-text"
                onKeyPress={(e)=> {if(e.key === 'Enter') setText()}}
                style={{
                    display: editing ? 'block' : 'none'
                }}
            />
            <div
                style={{
                    display: editing ? 'none' : 'block',
                    textDecoration: isDone ? 'line-through' : 'none'
                }}
                className="item-text"
                onClick={clickOnTextToEdit}
            >
                {text}
            </div>
            <button onClick={setDoneStatusHandler}>✓</button>
            <button onClick={removeItemHandler}>x</button>
        </li>
    )
}
