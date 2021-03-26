import React, { useState , useEffect } from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router';

function Edit() {
    let history = useHistory();
    const _id = useParams()
    const [user,setUser] = useState({
        name:'',email:'',phone:'',work:''
    })
    const handleChange= e =>{
        setUser({...user,[e.target.name]:e.target.value})
    }

    useEffect(() => {
        loadUser()
    }, [])


    const handleSubmit = async e =>{
        e.preventDefault()
       await axios.put(`http://localhost:4000/api/user/${_id._id}`, user)
        history.push("/list")
    }

    const loadUser = async () =>{
        const result = await axios.get(`http://localhost:4000/api/user/${_id._id}`)
        setUser(result.data)
    }
    return (
        <div className="container ">
        <form onSubmit={e=>handleSubmit(e)}>
        <div className="form-group">
        <label htmlfor="name">User Name</label>
        <input type="text" className="form-control" name="name"
        value={user.name}
        placeholder="Enter Name"
        onChange={e=>handleChange(e)}/>
        </div>
        <div className="form-group">
        <label htmlfor="email">Email address</label>
        <input type="email" className="form-control" name="email"
        value={user.email}
        placeholder="Enter email"
        onChange={e=>handleChange(e)}/>
        </div>
        <div className="form-group">
        <label htmlfor="phone">Enter Mobile</label>
        <input type="phone" className="form-control" name="phone"
        value={user.phone}
        placeholder="Enter phone"
        onChange={e=>handleChange(e)}/>
        </div>
        <div className="form-group">
        <label htmlfor="work">Work</label>
        <input type="text" className="form-control" name="work"
        value={user.work}
        placeholder="Profession"
        onChange={e=>handleChange(e)}/>
        </div>
       <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
  )
}

export default Edit
