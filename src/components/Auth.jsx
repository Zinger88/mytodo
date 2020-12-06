import React, { useState, useRef } from 'react';

export const Auth = (props) => {
    const email = useRef(null);
    const password = useRef(null);

    const createAccount = () => {
        let currentEmail = email.current.value;
        let currentPassword = password.current.value;
        if(currentPassword.length && currentEmail.length) {
            props.auth.createUserWithEmailAndPassword(currentEmail, currentPassword)
            .then((user) => {
                console.log(user);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                if(errorCode === 'auth/email-already-in-use') {
                    alert('You already have account! try to sign')
                }
                console.log(errorCode)
            });
        } else {
            alert('Так, тут надо поаккуравтнее');
        }
    }

    const signIn = () => {
        let currentEmail = email.current.value;
        let currentPassword = password.current.value;
        console.log(currentEmail, currentPassword);
        if(currentEmail.length && currentPassword.length) {
            props.auth.signInWithEmailAndPassword(currentEmail, currentPassword)
            .then((user) => {
                console.log(user);
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
           });
        } else {
            alert('Заполни нормально');
        }
    }

    return(
        <div>
            AUTH
            <input ref={email} type="email" placeholder="email"/>
            <input ref={password} type="password" placeholder="password"/>
            <button onClick={signIn}>Sign In</button>
            <button onClick={createAccount}>Create Account</button>
        </div>
    )
}