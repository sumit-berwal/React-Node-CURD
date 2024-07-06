import React, {useState} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

export default function  Create(){

    const navigate = useNavigate()

    const [values, setValues] = useState({
        name: "",
        email: "",
        gender: "",
        age: ""
    })

    function handelSubmit(e) {
        e.preventDefault();
        axios.post("/add_user", values)
        .then((res)=>{
            navigate('/')
            console.log(res)
        })
        .catch((err)=>console.log(err))
    }
    return (
        <div className='container-flued vh-100 vw-100 bg-primary'>
            <div className='container'>
                <div className='row'>
                    <h3>Add Student</h3>
                    <div className='d-flex justify-content-end'>
                        <Link to="/" className='btn btn-success'>Home</Link>
                    </div>
                    <form onSubmit={handelSubmit}>
                        <div className='form-group my-3'>
                            <label htmlFor='name'>Name</label>
                            <input type='text' name='name' onChange={(e)=> setValues({...values, name: e.target.value})}/>
                        </div>
                        <div className='form-group my-3'>
                            <label htmlFor='email'>Email</label>
                            <input type='text' name='email' onChange={(e)=> setValues({...values, email: e.target.value})}/>
                        </div>
                        <div className='form-group my-3'>
                            <label htmlFor='gender'>Gender</label>
                            <input type='text' name='gender' onChange={(e)=> setValues({...values, gender: e.target.value})}/>
                        </div>
                        <div className='form-group my-3'>
                            <label htmlFor='age'>Age</label>
                            <input type='text' name='age' onChange={(e)=> setValues({...values, age: e.target.value})}/>
                        </div>
                        <div className='form-group my-3'>
                            <button name='submit' className='btn btn-success'>Save</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}