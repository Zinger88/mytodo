import React from 'react';
import { Auth } from './components/Auth';
import { App } from './App';
import firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';

firebase.initializeApp({
    apiKey: "AIzaSyBGP7tMrPGmGtb9HCQvztkOtIzM4w9zFs4",
    authDomain: "todo-desktop-dbc2d.firebaseapp.com",
    databaseURL: "https://todo-desktop-dbc2d.firebaseio.com",
    projectId: "todo-desktop-dbc2d",
    storageBucket: "todo-desktop-dbc2d.appspot.com",
    messagingSenderId: "909466469260",
    appId: "1:909466469260:web:eef9dbb1a8895044c30ca9",
    measurementId: "G-E1E8L5ERRC"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

export const Root: React.FunctionComponent = () => {
    const [user ,initialising] = useAuthState(auth);
    return (
        <div className="root-container">
            {initialising && 
                <div className="spinner-container">
                    <div className="preloader-wrapper big active">
                        <div className="spinner-layer spinner-blue-only">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div>
                            <div className="gap-patch">
                                <div className="circle"></div>
                            </div>
                            <div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {user && !initialising && 
                <App 
                    user={user}
                    firestore={firestore}
                    auth={auth}
                />
            }
            {!initialising && !user &&
                <Auth firestore={firestore} auth={auth}/>
            }
        </div>
    )
}