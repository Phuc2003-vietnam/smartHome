// import {initializeApp} from 'firebase/app'
// import {getDatabase,ref,set,get,child} from 'firebase/database'
export const firebaseConfig = {
    apiKey: "AIzaSyBkI5oCJ3LGrSX4AlWHn-QzT8nHcjhZcyo",
    authDomain: "test-bc357.firebaseapp.com",
    projectId: "test-bc357",
    storageBucket: "test-bc357.appspot.com",
    messagingSenderId: "892878788908",
    appId: "1:892878788908:web:df9d5aeee91c1520e4b489",
    measurementId: "G-8F40G4JHHW"
  };

// export const _=initializeApp(firebaseConfig)
// const db=getDatabase()
// const dbRef=ref(db)
// export const saveToken=async(userId,token)=>{
//     const value=(await get(child(dbRef,`userTokens/${userId}/`))).val()??{}
//     const payload ={...value,token}
//     set(ref(db,`userTokens/${userId}/`),payload)
// }
// export const getToken=async(userId)=>{
//     const value=(await get(child(dbRef,`userTokens/${userId}/`))).val()??{}
//     return value??{}
// }
