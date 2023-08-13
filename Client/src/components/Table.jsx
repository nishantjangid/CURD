import React, { useEffect, useState } from 'react'
import { deleteUser, getUserData, getUsers, updateUserData } from '../utils/api';

const Table = () => {
    const [users,setUsers] = useState([]);
    const [loading,setLoading] = useState(true);
    const [show,setShow] = useState(false);
    const [user,setUser] = useState([]);    
    console.log(user);
 const allUsers = async () => {
    try{
        let response = await getUsers();
        setLoading(false);  
        setUsers(response.result);        
    }catch(err){
        setLoading(false);
        console.log(err);
    }
 }
 
 const deleteUsers = async (id) => {
    try{
        let response = await deleteUser(id);          
        alert(response.message);
        allUsers();
    }catch(err){        
        alert(err);
    }
 }

 const updateUser = async (id) => {
    try{
        let response = await getUserData(id);
        setShow(true);
        setUser(response.result[0]);
    }catch(err){
        alert(err);
    }
 }

 const handleSubmitUpdate = async (id,e) => {
    e.preventDefault();
    if(!id){
        alert('Something went wrong');
        return;
    }
    try{
        let response = await updateUserData(user,id);
        setShow(false);
        allUsers();
        alert(response.message);
    }catch(err){
        alert(err);
    }
 }

 useEffect(()=>{
    if(!loading) return;
    allUsers();
 },[]);

  return (
    <div className='tableClass'>
        <table border={1}>
            <thead>
                <th>Sr. no</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Action</th>
            </thead>
            <tbody>
                {users.length > 0 ? 
                    loading ? 'loading' : 
                    users.map((ele,idx)=>(
                        <tr>
                            <td>{++idx}</td>
                            <td>{ele.name}</td>
                            <td>{ele.email}</td>
                            <td>{ele.address}</td>
                            <td>
                                <button onClick={()=>deleteUsers(ele.id)}>Delete</button>
                                <button onClick={()=>updateUser(ele.id)}>Update</button>
                            </td>
                        </tr>
                    ))
                 : <tr><td colSpan={5}>No Data Found</td></tr>}
            </tbody>
        </table>
        <div>
            {show ?            
                <div style={{margin:"10px"}}>
                    <form method='post' onSubmit={(e)=>handleSubmitUpdate(user.id,e)}>
                        <input type='text' name='email' value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} placeholder='email' required/>
                        <input type='text' name='username' value={user.name} onChange={(e)=>setUser({...user,name:e.target.value})} placeholder='name' required/>
                        <input type='text' name='address' value={user.address} onChange={(e)=>setUser({...user,address:e.target.value})} placeholder='address' required/>
                        <button type='submit'>Update</button>
                    </form>
                </div>                           
             : ''}
        </div>
    </div>
  )
}

export default Table