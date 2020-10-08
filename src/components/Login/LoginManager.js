import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './farebase.config';

export const initializeLoginFramework = () => {
    if(firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

//Google SingIn
export const handleGoogleSingIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
   return firebase.auth().signInWithPopup(provider)
        .then(res => {
            const { displayName, email, photoUrl } = res.user;
            const singInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoUrl,
                success: true
            }
            setUserToken();
            return singInUser;

        })
        .catch(err => {
            console.log(err);
            console.log(err.message);
        })
    ;
    }


    //User Id Token
    const setUserToken = () => {
        firebase.auth().currentUser.getIdToken( true )
        .then(function (idToken) {
            sessionStorage.setItem('token', idToken);
        })
        .catch(function (error) {
            // Handle error
        });
    }
  

    //Google singOut
   export const handleSingOut = () => {
      return  firebase.auth().signOut()
            .then(res => {
                const singOutUser = {
                    isSignedIn: false,
                    name: '',
                    email: '',
                    error: '',
                    success: false

                }
                return singOutUser;
            })
            .catch(err => {

            })
    }

    //handle Facebook Login
    export const handleFbSignIn = () => {
        const fbProvider = new firebase.auth.FacebookAuthProvider();
       return firebase
            .auth().signInWithPopup(fbProvider)
            .then(function (result) {
                let user = result.user;
                user.success = true;
                return user
            })
            .catch(function (error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log( errorCode, errorMessage);
            });
    }



    //submitted - {create User With Email And Password}

    export const createUserWithEmailAndPassword = (name, email, password) => {
      return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(res => {
                const newUserInfo = res.user;
                newUserInfo.error = '';
                newUserInfo.success = true;
                updateUserName(name);
                verifyEmail();
                return newUserInfo;
            })
            .catch(error => {
                const newUserInfo = { };
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                return newUserInfo;
            });
    }

    //submitted - {sing User With Email And Password}

    export const signInWithEmailAndPassword = (email, password) => {
       return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(res => {
                const newUserInfo = res.user;
                newUserInfo.error = '';
                newUserInfo.success = true;
                return newUserInfo;
            })
            .catch(function (error) {
                const newUserInfo = { };
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                return newUserInfo;
            });
    }

    //update User Name
    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        })
            .then(function () {
                console.log('user name updated successful');
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    //email varified
    const verifyEmail = () => {
        var user = firebase.auth().currentUser;

        user.sendEmailVerification()
        .then(function () {
            // Email sent.
        })
        .catch(function (error) {
            // An error happened.
        });
    }

    //reset password
   export const resetPasswords = email => {
        var auth = firebase.auth();
        auth.sendPasswordResetEmail(email)
        .then(function () {
            // Email sent.
        }).catch(function (error) {
            // An error happened.
        });
    }