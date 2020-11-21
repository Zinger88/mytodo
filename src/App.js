import React, { useState, useRef } from 'react';
import { Item } from './components/Item';

export const App = function() {
    const inputEl = useRef(null);

    const [todoList, setTodoList] = useState([{id: 1, text: 'Задача 1'},{id: 2, text: 'Задача 2'}]);

    const addItem = () => {
        const inputRef = inputEl.current;
        const resultArray = [...todoList, {id: Math.floor(Math.random() * 1000), text: inputRef.value}];
        inputRef.value = '';
        setTodoList(resultArray);
    }

    const setText = (id, text = 'changed text') => {
        todoList.forEach(el => {
            if(el.id === id) {
                el.text = text;
            }
        });
        setTodoList(todoList);
    }

    const removeItem = (id = 1) => {
        const resultArray = todoList.filter(i => i.id !== id);
        setTodoList(resultArray);
    }

    return (
        <>
            <header>
                TODO LIST FOR TODAY
            </header>
            <main>
                <ul>
                    {todoList.map(item => {
                        return <Item
                                    key={item.id}
                                    id={item.id}
                                    text={item.text}
                                    removeItem={removeItem}
                                    setText={setText}
                                />
                    })}
                </ul>
            </main>
            <div className="createTaskBlock">
                <div className="createTaskBlock-input">
                    <input type="text" ref={inputEl} placeholder="Write Text Here"/>
                </div>
                <button onClick={addItem}>Add task</button>
            </div>
        </>
    )
}