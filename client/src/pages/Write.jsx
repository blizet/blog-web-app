import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation } from 'react-router-dom';

const Write = () => {

  const state=useLocation().state
  const [value,setValue]=useState(state?.title||"");
  const [title,setTitle]=useState(state?.desc||"");
  const [file,setFile]=useState(null);
  const [category,setCategory]=useState(state?.category||"");
  console.log(value)

  const upload=async()=>{
     try {
      const formData =new FormData();
      formData.append("file",file)
      const res=await axios.post("/upload",formData)
      return res.data
     } catch (error) {
      console.log(error)
     }
  }


  const handleClick=async e=>{
  e.preventDefault()
  const imgUrl=await  upload()
  
  try {
    state? await axios.put(`/posts/${state.id}`,{
      title,
      desc:value,
      category,
      img:file? imgUrl :""
    }) : await axios.post(`/posts/`,{
      title,
      desc:value,
      category,
      img:file? imgUrl :"",
      date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    })
  } catch (error) {
    console.log(error)
  }
  }

  return (
    <div className='add'>
      <div className="content">
        <input type="text" value={title} placeholder='Title' onChange={e=>setTitle(e.target.value)}/>
        <div className="editContainer">
           <ReactQuill className='editor' theme='snow' value={value} onChange={setValue}/>
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status:</b>Draft
          </span>
          <span>
            <b>Visibility:</b>Public
          </span>
          <input style={{display:"none"}}  type="file" id='file' name='' onChange={e=>setFile(e.target.files[0])}  />
          <label className='file' htmlFor="file">Upload Image</label>
          <div className="buttons">
            <button>Save as Draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
          <input type="radio" checked={category==="happy"} name='cat' value="art" id="happy" onChange={e=>setCategory(e.target.value)}/>
          <label htmlFor="happy">Happy</label>
          </div>
          <div className="cat">
          <input type="radio" checked={category==="memories"} name='cat' value="memories" id="memories" onChange={e=>setCategory(e.target.value)}/>
          <label htmlFor="memories">Memories</label>
          </div>
          <div className="cat">
          <input type="radio" checked={category==="firstlove"} name='cat' value="firstlove" id="firstlove" onChange={e=>setCategory(e.target.value)}/>
          <label htmlFor="firstlove">First Love</label>
          </div>
          <div className="cat">
          <input type="radio" checked={category==="heartbreak"} name='cat' value="heartbreak" id="heartbreak" onChange={e=>setCategory(e.target.value)}/>
          <label htmlFor="heartbreak">Heartbreak</label>
          </div>
          <div className="cat">
          <input type="radio" checked={category==="friends"} name='cat' value="friends" id="friends" onChange={e=>setCategory(e.target.value)}/>
          <label htmlFor="friends">Friends</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write