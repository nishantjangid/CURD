const { API_URL } = require("../constants");

const getUsers = () =>{
    return new Promise(async(resolve,reject)=>{
        try{
            let result = await fetch(`${API_URL}/users`,{
            method:'GET',
            headers:{
                'Content-Type':"application/json"
            }
            })
            let data = await result.json();
            if(result.status == 200){
                resolve(data);
            }else{
                reject(data);
            }            
        }catch(err){
            reject(err);
        }
    })
}

const createUser = (userData) =>{
    return new Promise(async(resolve,reject)=>{
        try{
            let result = await fetch(`${API_URL}/create`,{
            method:'POST',
            body:JSON.stringify(userData),
            headers:{
                'Content-Type':"application/json"
            }
            })
            let data = await result.json();
            console.log(data);
            if(result.status == 200 || result.status == 201){
                resolve(data);
            }else{
                reject(data);
            }            
        }catch(err){
            reject(err);
        }
    })
}

const deleteUser = async (id) => {
    return new Promise(async(resolve,reject)=>{
        try{
            let result = await fetch(`${API_URL}/delete/${id}`,{
            method:'POST',            
            headers:{
                'Content-Type':"application/json"
            }
            })
            let data = await result.json();
            console.log(data);
            if(result.status == 200 || result.status == 201){
                resolve(data);
            }else{
                reject(data);
            }            
        }catch(err){
            reject(err);
        }
    })
}

const updateUserData = async (user,id) => {
    return new Promise(async(resolve,reject)=>{
        try{
            let result = await fetch(`${API_URL}/update/${id}`,{
            method:'POST',
            body:JSON.stringify(user),
            headers:{
                'Content-Type':"application/json"
            }
            })
            let data = await result.json();
            console.log(data);
            if(result.status == 200 || result.status == 201){
                resolve(data);
            }else{
                reject(data);
            }            
        }catch(err){
            reject(err);
        }
    })
}




const getUserData = async (id) => {
    return new Promise(async(resolve,reject)=>{
        try{
            let result = await fetch(`${API_URL}/user/${id}`,{
            method:'GET',            
            headers:{
                'Content-Type':"application/json"
            }
            })
            let data = await result.json();
            console.log(data);
            if(result.status == 200 || result.status == 201){
                resolve(data);
            }else{
                reject(data);
            }            
        }catch(err){
            reject(err);
        }
    })  
}



module.exports = {getUsers,createUser,deleteUser,getUserData,updateUserData};