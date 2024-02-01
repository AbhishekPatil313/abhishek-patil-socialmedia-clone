import React, { useState } from 'react'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

import { auth, firestore } from '../firebase/firebase';
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import useShowToast from './useShowToast';
import useAuthStore from '../store/authStore';

function useSignUpWithEmailAndPassword() {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginUser= useAuthStore(state => state.login);
  const [
    createUserWithEmailAndPassword,
    ,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);
  const showToast = useShowToast();


  const signup = async(inputs) =>{

    if(!inputs.email ||  !inputs.fullName || !inputs.username || !inputs.password){
        showToast("Error" ,"Please fill all the fields" , "error");
        return;
    }

    const usersRef = collection(firestore,"users");
    const q = query(usersRef,where("username" ,"==" ,inputs.username));
    const querySnapshot = await getDocs(q);
    if(!querySnapshot.empty){
      showToast("Error" ,"Username already exists","error");
      return;
    }
    try {
        const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
        if(!newUser && error){
            showToast("Error" ,error.message , "error");
            return
        } 
        if(newUser){
            const userDoc = {
                uid : newUser.user.uid ,
                email : inputs.email,
                username  : inputs.username,
                fullName : inputs.fullName,
                bio : "",
                profilePicURL : "",
                follwers:[],
                follwing : [],
                posts:[],
                createdAt : Date.now(),
            };
            await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
            localStorage.setItem("user-info",JSON.stringify(userDoc));
            showToast("Success","User registered !","success");
            loginUser(userDoc);
    }
    } catch (error) {
         
        showToast("Error" ,error.message , "error");

    }
  }
  return {
            loading,error,signup,
  }
}

export default useSignUpWithEmailAndPassword; 