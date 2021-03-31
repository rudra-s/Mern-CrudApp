import React from 'react'
import '../App.css';
function Notfound() {
    return (
        <div className="not-found">
            <h1>Page Not Found ! Sorry</h1>
        </div>
    )
}

export default Notfound


import React, { useState } from "react";
import "../App.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios'

const schema = yup.object().shape({
  firstName: yup.string().required("First Name should be required please"),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  age: yup.number().positive().integer().required(),
  password: yup.string().min(4).max(15).required(),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
});

function Form() {

    const [user,setUser] = useState({
        name:'' , email:'',password:''
    })
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const handleChange = e=>{
      setUser({...user ,[e.target.name]:e.target.value})
  }

  const submitForm = (e) => {
    e.preventDefault()
    console.log(user)
    axios.get('http://localhost:4000/api/user',user)

  };
  return (
    <div className="Form">
      <div className="title">Sign Up</div>
      <div className="inputs">
        <form onSubmit={handleSubmit(e=>submitForm(e))}>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={e=>handleChange(e)}
            ref={register}
            placeholder="Name..."
          />
          <p> {errors.name?.message} </p>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={e=>handleChange(e)}
            placeholder="Email..."
            ref={register}
          />
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={e=>handleChange(e)}
            placeholder="Password..."
            ref={register}
          />
          <p> {errors.password?.message} </p>
          {/* <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password..."
            ref={register}
          />
          <p> {errors.confirmPassword && "Passwords Should Match!"} </p> */}
         <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Form;
