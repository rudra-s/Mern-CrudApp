import React, { useState , useEffect } from 'react'
import axios from 'axios'
import '../App.css'
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';

function View() {
    let history = useHistory();
    const _id = useParams()
    const [user,setUser] = useState({
        name:'',email:'',phone:'',work:''
    })

    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = async () =>{
        const result = await axios.get(`http://localhost:4000/api/user/${_id._id}`)
        setUser(result.data)
    }
    return(
        <div className="container">
       <h1><center>Users Information</center></h1>
       <Link className='btn btn-secondary' to="/list">Back</Link>
       <ul className="tag">
           <li  className="tags">Name:       {user.name}</li>
           <li className="tags">Email:      {user.email}</li>
           <li className="tags">Phone:      {user.phone}</li>
           <li className="tags">Profession: {user.work}</li>
       </ul>

       </div>
    )
}
export default View
