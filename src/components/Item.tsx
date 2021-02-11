import React, { useState } from 'react';
import { ItemProps } from '../interfaces';

export const Item: React.FunctionComponent<ItemProps> = (props) => {
    const [text, changeText] = useState(props.text);
    const [editing, setEditing] = useState(false);
    const [time, setTime] = useState(0);
    const [isDone, setDoneStatus] = useState(props.isDone);

    const removeItemHandler = () => {
        props.removeItem(props.id);
    }

    const editTime: number = 3000;

    const setDoneStatusHandler = () => {
        setDoneStatus(!isDone);
        props.setDoneStatus(props.id, !isDone);
    }

    const clickOnTextToEdit = (): void => {
        setEditing(true);
        if(time) {
            clearTimeout(time);
        }
        setTime(window.setTimeout(() => {
            setEditing(false);
        }, editTime));
    }

    const changeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const lastText = event.target.value;
        changeText(lastText);
        if(time) {
            clearTimeout(time);
        }
        setTime(window.setTimeout(() => {
            setEditing(false);
            if(text !== props.text) {
                props.setText(props.id, lastText);
            }
        }, editTime));
    }

    const setText = (): void => {
        setEditing(false);
        props.setText(props.id, text);
    }

    const onKeyPressHandler = (event: React.KeyboardEvent) => {
        if(event.key === 'Enter') {
            setText();
        }
    }

    return (
        <li id={props.id} className='item' key={props.id}>
            <input
                value={text}
                onChange={changeInput}
                className="item-edit-text"
                onKeyPress={onKeyPressHandler}
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
