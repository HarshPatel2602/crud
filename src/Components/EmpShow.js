import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const EmpShow = () => {
  const { empid } = useParams();

  const [empdata, empdatachange] = useState({});

  useEffect(() => {
    fetch("http://192.168.0.48:9000/books").then((res) => {
      return res.json();
    }).then((resp) => {
      resp.map((item)=>{
        if(item.id == empid ){
          empdatachange(item);
        }
      })
    }).catch((err) => {
      console.log(err.message);
    })
  },[])
  return ( 
    <div>
      <div className='card'>
        <div className='card-title'>
          <h2>Employ Create</h2>
        </div>
        {empdata &&
          <div>
            <h1>The employ name is : <b>{empdata.title}</b> ({empdata.id})</h1>
            <h3>Contact Show</h3>
            <h5>Description is : {empdata.description}</h5>
            <h5>Cover is : {empdata.cover}</h5>
            <Link className='btn btn-danger' to='/'>Back to Listing</Link>
          </div>
        }
      </div>
    </div>
  )
}
export default EmpShow
