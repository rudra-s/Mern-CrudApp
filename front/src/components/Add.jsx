import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router';

function Add() {
    let history = useHistory();
    const [user,setUser] = useState({
        name:'',email:'',phone:'',password:'',work:''
    })
    const {name,email,phone,password,work}=user;

    const handleChange= e =>{
        setUser({...user,[e.target.name]:e.target.value})
    }
    const handleSubmit = async e =>{
        e.preventDefault()
        console.log(user)
        await axios.post('http://localhost:4000/api/user' , user)
        history.push("/list")
    } 
    return (
        <div className="container ">
        <form onSubmit={e=>handleSubmit(e)}>
        <div className="form-group">
        <label htmlfor="name">User Name</label>
        <input type="text" className="form-control" name="name" 
        value={name} 
        placeholder="Enter Name" 
        onChange={e=>handleChange(e)}/>
        </div>
        <div className="form-group">
        <label htmlfor="email">Email address</label>
        <input type="email" className="form-control" name="email" 
        value={email}
        placeholder="Enter email" 
        onChange={e=>handleChange(e)}/>
        </div>
        <div className="form-group">
        <label htmlfor="phone">Enter Mobile</label>
        <input type="phone" className="form-control" name="phone" 
        value={phone}  
        placeholder="Enter phone" 
        onChange={e=>handleChange(e)}/>
        </div>
        <div className="form-group">
        <label htmlfor="password">Password</label>
        <input type="password" className="form-control" name="password" 
        value={password} 
        placeholder="Password" 
        onChange={e=>handleChange(e)}/>
        </div>
        <div className="form-group">
        <label htmlfor="work">Work</label>
        <input type="text" className="form-control" name="work" 
        value={work} 
        placeholder="Profession" 
        onChange={e=>handleChange(e)}/>
        </div>
       <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
  )
}

export default Add
