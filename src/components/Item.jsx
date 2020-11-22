import React, { useState } from 'react';

export const Item = (props) => {
    const [text, changeText] = useState(props.text);
    const [editing, setEditing] = useState(false);

    const removeItemHandler = () => {
        props.removeItem(props.id);
    }

    const changeInput = (event) => {
        changeText(event.target.value);
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
                style={{display: editing ? 'none' : 'block'}}
                className="item-text"
                onClick={() => {setEditing(true)}}
            >
                    {text}
            </div>
            <button onClick={removeItemHandler}>x</button>
        </li>
    )
}
