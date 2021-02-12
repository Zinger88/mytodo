import React, { useRef } from 'react';

interface AuthProps {
    firestore: any,
    auth: any,
}

export const Auth: React.FunctionComponent<AuthProps> = (props) => {
    const email = useRef(null);
    const password = useRef(null);

    const createAccount = () => {
        let currentEmail = email.current.value;
        let currentPassword = password.current.value;
        if(currentPassword.length && currentEmail.length) {
            props.auth.createUserWithEmailAndPassword(currentEmail, currentPassword)
            .then((user: any) => {
                console.log('Sign in ',user);
            })
            .catch((error: any) => {
                const errorCode = error.code;
                if(errorCode === 'auth/email-already-in-use') {
                    alert('You already have account! try to sign')
                }
                console.log(errorCode)
            });
        } else {
            alert('Так, тут надо поаккуратнее');
        }
    }

    const signIn = () => {
        let currentEmail = email.current.value;
        let currentPassword = password.current.value;
        if(currentEmail.length && currentPassword.length) {
            props.auth.signInWithEmailAndPassword(currentEmail, currentPassword)
            .then((user: object) => {
                console.log(user);
            })
            .catch((error: any) => {
                const errorMessage = error.message;
                alert(errorMessage);
           });
        } else {
            alert('Заполни нормально');
        }
    }
    
    const keyDownHandler = (event: React.KeyboardEvent) => {
        if(event.code === 'Enter') {
            signIn();
        } 
    }

    return(
        <form
            style={{
                padding: '20px'
            }}
        >
            <h3>Auth</h3>
            <div className="input-field">
                <input 
                    autoComplete="on" 
                    id="email" 
                    ref={email} 
                    type="email" 
                    placeholder="email"
                    onKeyDown={keyDownHandler}
                />
                <label className="active" htmlFor="email">Введите e-mail</label>
            </div>
            <div className="input-field">
                <input 
                    autoComplete="on" 
                    className="input-field" 
                    id="auth-password" 
                    ref={password} type="password" 
                    placeholder="password"
                    onKeyDown={keyDownHandler}
                />
                <label className="active" htmlFor="auth-password">Введите пароль</label>
            </div>
            
            
            <div style={{display: 'flex', justifyContent: 'space-between', paddingTop: '30px'}}>
                <a onClick={signIn} className="waves-effect waves-light btn-large"><i className="material-icons left">cloud</i>sign in</a>
                <a onClick={createAccount} className="waves-effect waves-light btn-large">Create Account</a>
            </div>
        </form>
    )
}