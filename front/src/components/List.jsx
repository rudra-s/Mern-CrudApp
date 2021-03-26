import React, { useState,useEffect } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

function List() {
    const [users , setUser] = useState([]);
    useEffect(() => {
        loadUser();
    }, [])

    const loadUser = async ()=>{
        const result = await axios.get('http://localhost:4000/api/user/')
        setUser(result.data.reverse())
    }

    const deleteUser = async _id =>{
      await axios.delete(`http://localhost:4000/api/user/${_id}`)
      loadUser()
    }
return (
<div>
 <table className="table">
  <thead>
    <tr>
      <th>Id</th>
      <th>Name</th>
      <th>Email</th>
      <th>Phone</th>
      <th>Work</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {users.map((user,index)=>(
     <tr key={index}>
     <td>{index+1}</td>
     <td>{user.name}</td>
     <td>{user.email}</td>
     <td>{user.phone}</td>
     <td>{user.work}</td>
     <td><Link className="btn btn-primary mr-2" to={`view/${user._id}`}>view</Link>
     <Link className="btn btn-outline-success mr-2" to={`edit/${user._id}`}>edit</Link>
     <Link className="btn btn-danger" onClick={() => deleteUser(user._id)}>delete</Link></td>
     </tr>
    ))}
  </tbody>
</table>
</div>
)
}

export default List
