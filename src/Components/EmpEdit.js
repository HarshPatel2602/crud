import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

const EmpEdit = () => {
  const { empid } = useParams();

  // const [empdata, empdatachange] = useState({});

  
  const [id, idchange] = useState(empid)
  const [title, titlechange] = useState('')
  const [description, descriptionchange] = useState('')
  const [cover, coverchange] = useState('')
  const [active, activechange] = useState(true)
  const [validation, valchange] = useState(false)
  const navigate = useNavigate()

  function getAllData(){
    fetch("http://192.168.0.48:9000/books").then((res) => {
      return res.json();
    }).then((resp) => {
      resp.map((item)=>{
        if(item.id == empid ){
          idchange(item.id)
          titlechange(item.title)
          descriptionchange(item.description)
          coverchange(item.cover)
          activechange(item.isactive)
        }
        return;
      })
    }).catch((err) => {
      console.log(err.message);
    })
}
  
  useEffect(() => {
    getAllData()
  },[])

  const handlesubmit = (e) => {
    e.preventDefault()
    const empdata = { id, title, description, cover, active }
    fetch("http://192.168.0.48:9000/updateBook", {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(empdata)
    }).then((res) => {
      alert('saved successfully.')
      navigate('/')
    }).catch((err) => {
      console.log(err.message);
    })
  }
  return (
    <div>
      <div className='row'>
        <div className='offset-lg-3 col-lg-6'>
          <form className='container' onSubmit={handlesubmit}>
            <div className='card'>
              <div className='card-title'>
                <h2 className='text-center'>Employ Edit</h2>
              </div>
              <div className='card-body'>
                <div className='row'>
                  <div className='col-lg-12'>
                    <div className='form-group'>
                      <label><b>ID</b></label>
                      <input value={id || ""} disabled='disabled' className='form-control'></input>
                    </div>
                  </div>
                  <div className='col-lg-12'>
                    <div className='form-group'>
                      <label><b>Title</b></label>
                      <input required value={title || ""} onMouseDown={e => valchange(true)} onChange={e => titlechange(e.target.value)} className='form-control'></input>
                      {title.length === 0 && validation && <span className='text-danger'>Enter the title</span>}
                    </div>
                  </div>
                  <div className='col-lg-12'>
                    <div className='form-group'>
                      <label><b>Description</b></label>
                      <input value={description || ""} onChange={e => descriptionchange(e.target.value)} className='form-control'></input>
                    </div>
                  </div>
                  <div className='col-lg-12'>
                    <div className='form-group'>
                      <label><b>Cover</b></label>
                      <input value={cover || ""} onChange={e => coverchange(e.target.value)} className='form-control'></input>
                    </div>
                  </div>
                  <div className='col-lg-12'>
                    <div className='form-check'>
                      <input checked={true} onChange={e => activechange(!active)} type='checkbox' className='form-check-input'></input>
                      <label className='form-check-label'><b>Is Active</b></label>
                    </div>
                  </div>
                  <div className='col-lg-12'>
                    <div className='form-group'>
                      <input value="save" className='btn btn-success float-end' type='submit' />
                      <Link to='/' className='btn btn-danger'>Back</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EmpEdit

// import { useEffect, useState } from 'react';
// import { Link, useNavigate, useParams } from 'react-router-dom';

// const EmpEdit = () => {
//   const { empid } = useParams();

//   // const [empdata, empdatachange] = useState({})

//   useEffect(() => {
//     fetch("http://localhost:8000/employ/" + empid).then((res) => {
//       return res.json();
//     }).then((resp) => {
//       idchange(resp.id);
//       titlechange(resp.title);
//       descriptionchange(resp.description);
//       coverchange(resp.cover);
//       activechange(resp.isactive);
//     }).catch((err) => {
//       console.log(err.message);
//     })
//   },);

//   const [id, idchange] = useState("");
//   const [title, titlechange] = useState("");
//   const [description, descriptionchange] = useState("");
//   const [cover, coverchange] = useState("");
//   const [active, activechange] = useState(true);
//   const [validation, valchange] = useState(false);

//   const navigate = useNavigate();

//   const handlesubmit = (e) => {
//     e.preventDefault();
//     const empdata = { id, title, description, cover, active  };
    
//     fetch(" http://localhost:8000/employee/"+empid, {
//       method: "PUT",
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify(empdata)
//     }).then((res) => {
//       alert('Saved Successfully.')
//       navigate('/');
//     }).catch((err) => {
//       console.log(err.message)
//     })

//   }
//   return (
//     <div>
//     <div className='row'>
//       <div className='offset-lg-3 col-lg-6'>
//         <form className='container' onSubmit={handlesubmit}>

//           <div className='card'>
//             <div className='card-title'>
//               <center><h2 >employee Edit</h2></center>
//             </div>
//             <div className='card-body'>
//               <div className='row'>

//                 <div className='col-lg-12'>
//                   <div className='form-group'>
//                     <label>ID</label>
//                     <input value={id} disabled="disabled" className='form-control' ></input>
//                   </div>
//                 </div>

//                 <div className='col-lg-12'> 
//                   <div className='form-group'>
//                     <label>Name</label>
//                     <input  required value={title} onMouseDown={e => valchange(true)} onChange={e => titlechange(e.target.value)} className='form-control'></input>
//                    {title.length ===0 &&  validation  && <span className='text-danger'>Enter the name</span>}
//                   </div>
//                 </div>

//                 <div className='col-lg-12'>
//                   <div className='form-group'>
//                     <label>Email</label>
//                     <input value={description} onChange={e => descriptionchange(e.target.value)} className='form-control'></input>
//                   </div>
//                 </div>

//                 <div className='col-lg-12'>
//                   <div className='form-group'>
//                     <label>Phone</label>
//                     <input value={cover} onChange={e => coverchange(e.target.value)} className='form-control'></input>
//                   </div>
//                 </div>

//                 <div className='col-lg-12'>
//                   <div className='form-check'>
//                     <input checked={active} onChange={e => activechange(e.target.checked)} type="checkbox" className='form-check-input'></input>
//                     <label className='form-check-label'>Is Active</label>
//                   </div>
//                 </div>
//                 <div className='col-lg-12'>
//                   <div className='form-group'>
//                     <button className='btn btn-success' type='submit'>Save</button>
//                     <Link to="/" className='btn btn-danger'>Back</Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   </div>
//   )
// }

// export default EmpEdit