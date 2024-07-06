import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

export default function Home (){
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('/students')
        .then((res)=>{
            setData(res.data)
        })
        .catch((err)=>console.log(err))
    }, [])


    const handelDelete = (id)=>{
            if(window.confirm("Are you sure?")){
                axios.get(`/delete_student/${id}`)
                    .then((res)=>{
                        alert(res.data.message);
                        navigate("/");
                    })
                    .catch((err)=>console.log(err))
            }
        
    }


    return (
        <div className='container-flued bg-primary vh-100 vw-100'>
            <h3>Students</h3>
            <div className='d-flex justify-content-end'>
                <Link to="/create" className='btn btn-success'>Add Studnet</Link></div>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Gender</td>
                        <td>Age</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((student)=>{
                            return (
                                <tr>
                                    <td>{student.id}</td>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.gender}</td>
                                    <td>{student.age}</td>
                                    <td>
                                        <Link className='btn btn-success' to={`/read/${student.id}`}>Read</Link>
                                        <Link className='btn btn-warning' to={`/edit/${student.id}`}>Edit</Link>
                                        <button className='btn btn-danger' onClick={() => handelDelete(student.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}