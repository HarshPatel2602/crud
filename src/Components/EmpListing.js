import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./EmpListing.css"

const EmpListing = () => {
    const [empdata, empdatachange] = useState(null);
    const navigate = useNavigate()

    const LoadDetail = (id) => {
        navigate('/crud/show/' + id)
    }
    const LoadEdit = (id) => {
        navigate('/crud/edit/' + id)
    }

    function getAllData() {
        fetch("http://192.168.0.48:9000/books").then((res) => {
            return res.json();
        }).then((resp) => {
            empdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }

    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch("http://192.168.0.48:9000/deleteBook", {
                method: 'DELETE',
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ id }),
            }).then((res) => {
                alert('Removed successfully.')
                getAllData()
            }).catch((err) => {
                console.log(err.message);
            })
        }
    }

    useEffect(() => {
        getAllData()
    }, [])
    return (
        <div className='container'>
            <div className='card'>
                <div className='card-title text-center'>
                    <h2 className='showTitle'>Employ Listing</h2>
                </div>
                <div className='card-body'>
                    <div>
                        <Link to='crud/create' className='btn btn-success btn-sm float-end'>ADD</Link>
                    </div>
                    <table className='table table-bordered'>
                        <thead className='table-dark'>
                            <tr>
                                <td className='text-center'><b>ID</b></td>
                                <td className='text-center'><b>Title</b></td>
                                <td className='text-center'><b>Description</b></td>
                                <td className='text-center'><b>Cover</b></td>
                                <td className='text-center'><b>Action</b></td>
                            </tr>
                        </thead>
                        <tbody>
                            {empdata &&
                                empdata.map(item => (
                                    <tr key={item.id}>
                                        <td className='text-center'>{item.id}</td>
                                        <td className='text-center'>{item.title}</td>
                                        <td className='text-center'>{item.description}</td>
                                        <td className='text-center'>{item.cover}</td>
                                        <td className='text-center'>
                                            <a onClick={() => { LoadDetail(item.id) }} > <span></span>
                                                <span></span>
                                                <span></span>
                                                <span></span>Show</a>
                                            <a onClick={() => { LoadEdit(item.id) }} > <span></span>
                                                <span></span>
                                                <span></span>
                                                <span></span>Edit</a>
                                            <a onClick={() => { Removefunction(item.id) }} > <span></span>
                                                <span></span>
                                                <span></span>
                                                <span></span>Delete</a>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default EmpListing
