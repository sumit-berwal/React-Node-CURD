import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link, useParams, useNavigate } from 'react-router-dom';


export default function Edit(){

    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const { id } = useParams();

    useEffect(()=>{
        axios.get(`/get_students/${id}`)
        .then((res)=>{
            setData(res.data)
        })
        .catch((err)=>console.log(err))
    }, [id]);

    function handelSubmit(e) {
        e.preventDefault();
        console.log(data[0]);
        axios.post(`/update_student/${id}`, data[0])
        .then((res)=>{
            navigate('/')
            console.log(res)
        })
        .catch((err)=>console.log(err))
    }

    return (
        <div className='container-flued vh-100 vw-100'>
            <h3>Edit User { id }</h3>
            <Link to="/">Back</Link>
            
                {
                    data?.map((student)=>{
                        return(
                            <form onSubmit={handelSubmit} key={student.id} >
                                <div className='form-group my-3'>
                                    <label htmlFor='name'>Name</label>
                                    <input type='text' name='name' value={student["name"]} onChange={(e)=> setData([{...data[0], name: e.target.value}])}/>
                                </div>
                                <div className='form-group my-3'>
                                    <label htmlFor='email'>Email</label>
                                    <input type='text' name='email' value={student["email"]} onChange={(e)=> setData([{...data[0], email: e.target.value}])}/>
                                </div>
                                <div className='form-group my-3'>
                                    <label htmlFor='gender'>Gender</label>
                                    <input type='text' name='gender' value={student["gender"]} onChange={(e)=> setData([{...data[0], gender: e.target.value}])}/>
                                </div>
                                <div className='form-group my-3'>
                                    <label htmlFor='age'>Age</label>
                                    <input type='text' name='age' value={student["age"]} onChange={(e)=> setData([{...data[0], age: e.target.value}])}/>
                                </div>
                                <div className='form-group my-3'>
                                    <button name='submit' className='btn btn-success'>Update</button>
                                </div>
                            </form>
                    )})}
            
        </div>
    )
}