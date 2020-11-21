import React, { useState } from 'react';

let trottling = true; // temporary solution. Have been written at night

export const Item = (props) => {
    const [text, changeText] = useState(props.text);

    const removeItemHandler = () => {
        props.removeItem(props.id);
    }

    const changeInput = (event) => {
        changeText(event.target.value);
        if(trottling) {
            trottling = false;
            setTimeout(() => {
                setText();
                trottling = true;
            }, 1000);
        }
    }

    const setText = () => {
        props.setText(props.id, text);
    }

    return (
        <li id={props.id} className='item' key={props.id}>
            <input
                value={text}
                onChange={changeInput}
            />
            <button onClick={removeItemHandler}>x</button>
        </li>
    )
}
