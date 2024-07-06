import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';


export default function Read(){

    const [data, setData] = useState([]);
    const { id } = useParams();

    useEffect(()=>{
        axios.get(`/get_students/${id}`)
        .then((res)=>{
            setData(res.data)
        })
        .catch((err)=>console.log(err))
    }, []);

    return (
        <div className='container-flued vh-100 vw-100'>
            <h3>User { id }</h3>
            <Link to="/">Back</Link>
            
                {
                    data.map((student)=>{
                        return(
                            <ul className='list-group'>
                                <li className='list-group-item'>
                                    <b>ID: </b>
                                    {student["id"]}
                                </li>
                                <li className='list-group-item'>
                                    <b>Name: </b>
                                    {student["name"]}
                                </li>
                                <li className='list-group-item'>
                                    <b>Email: </b>
                                    {student["email"]}
                                </li>
                                <li className='list-group-item'>
                                    <b>Gender: </b>
                                    {student["gender"]}
                                </li>
                                <li className='list-group-item'>
                                    <b>Age: </b>
                                    {student["age"]}
                                </li>
                                </ul>
                    )})}
            
        </div>
    )
}