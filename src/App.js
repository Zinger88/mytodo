import React from 'react';

export const App = function() {
    return (
        <>
            <header>
                TODO LIST FOR TODAY
            </header>
            <main>
                <ul>
                    <li id="task_0">
                        <span>
                            Текст задачи
                        </span>
                        <button>Edit</button>
                        <button>x</button>
                    </li>
                </ul>
            </main>
            <div className="createTaskBlock">
                <div className="createTaskBlock-input">
                    <input type="text" placeholder="Write Text Here"/>
                </div>
                
                <button>Add task</button>
            </div>
        </>
    )
}