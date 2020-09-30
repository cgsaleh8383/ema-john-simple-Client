import React, { useState, useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSingIn, handleSingOut, initializeLoginFramework, resetPasswords, signInWithEmailAndPassword} from './LoginManager'



function Login() {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        
        isSignedIn: false,
        email: '',
        password: '',
        name: '',
    })
    
    initializeLoginFramework()
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
 
 //Google redirect
    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from);
        }
    }

    //Google SingIn
    const googleSingIn = () => {
        handleGoogleSingIn()
        .then(res => {
            handleResponse(res, true);
        })
    }

    //Google singOut
    const singOut = () => {
        handleSingOut()
        .then(res => {
          handleResponse(res, false);
        })
    }

    // Fb SignIn
    const FbSignIn = () => {
        handleFbSignIn()
         .then(res => {
             handleResponse(res, true);
         })
    }

    //handleSubmit
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword( user.name, user.email, user.password )
            .then(res => {
                handleResponse(res, true);
            })
        }

        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
             .then(res => {
                 handleResponse(res, true);
              })     
         }
        e.preventDefault();
    }

    //handleOnBlur
    const handleChange = (e) => {

        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
            console.log(isFieldValid);
        }
        if (e.target.name === 'password') {
            const isPassword = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value)
            isFieldValid = isPassword && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo)
        }
    }


    return (
        <div style={{textAlign: 'center'}}>

                {
                    user.isSignedIn ? <button onClick={singOut}>Sing out</button> :
                        <button onClick={googleSingIn}>Sing in</button>

                }
                <button onClick={FbSignIn}>Sing in Using Facebook</button>
                {
                    user.isSignedIn &&
                    <div>
                        <p>welcome {user.name}</p>
                        <p>Your email {user.email}</p>
                        <img src={user.photo} alt="" />
                    </div>
                }
                {/* input form  5ebbf9557330ea77b28f68f198f6da57*/}
                <h1>Our own Authentication</h1>
                <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
                <label htmlFor="newUser">New User Sing Up</label>
                 <form className='ship-from' onSubmit={handleSubmit}>
                    {newUser && <input type="text" onBlur={handleChange} name="name" id="" placeholder="enter your name" />}
                    <input type="email" onBlur={handleChange} name='email' placeholder="enter your email" required />
                    <input type="password" onBlur={handleChange} name="password" id="" placeholder="Enter your password" required />
                    <input  type="submit" value={newUser ? 'Sing Up' : 'Sing In'} />
                </form>
                 <button onClick={() => resetPasswords(user.email)}>FOrget Or Reset password</button>
                <p style={{ color: 'red' }}>{user.error}</p>
                {user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} Successfully</p>}
           
        </div>
    );
}

export default Login;