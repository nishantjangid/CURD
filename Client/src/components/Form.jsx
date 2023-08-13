import React from 'react'
import { createUser } from '../utils/api';

const Form = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        let name = e.target.username.value;
        let email = e.target.email.value;
        let address = e.target.address.value;
        if(!email){
            alert('Pleae provide email');
            return;
        }

        if(!name){
            alert('Pleae provide name');
            return;
        }
        if(!address){
            alert('Pleae provide address');
            return;
        }
        try{
            let response = await createUser({email,address,name});
            console.log(response,"res");
            alert(response.message);
        }catch(err){
            alert(err);
        }
        
    }
  return (
    <div style={{margin:"10px"}}>
        <form method='post' onSubmit={handleSubmit}>
            <input type='text' name='email' placeholder='email' required/>
            <input type='text' name='username' placeholder='name' required/>
            <input type='text' name='address' placeholder='address' required/>
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default Form