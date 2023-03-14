import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu'
import Delete from '../img/delete.jpg'
import Edit from '../img/edit.jpg'
import moment from 'moment'
import { AuthContext } from '../context/authContext'

const Single = () => {
  const [post,setPost]=useState({})

  const location= useLocation()
  const navigate=useNavigate()

  const postId = location.pathname.split("/")[2]

  const {currentUser}= useContext(AuthContext)

  useEffect(()=>{
      const fetchData= async ()=>{
          try{
          const res= await axios.get(`/posts/${postId}`)
          setPost(res.data)
          }catch(err){
              console.log(err)
          }
      };
      fetchData();
  },[postId]);

  const handleDelete = async ()=>{
    console.log("try")
    try{
        
        await axios.delete(`/posts/${postId}`)
        navigate("/")
        console.log('deleted')
        }catch(err){
            console.log("error")
            console.log(err)
        }
  }
  const getText=(html)=>{
    const doc=new DOMParser().parseFromString(html,"text/html")
    return doc.body.textContent
}
  return (
    <div className='single'>
        <div className="content">
        <img src={`../upload/${post?.img}`} alt="" />
        <div className="user">
            {post.userImg &&<img src={post.userImg} alt="" />}
            <div className="info">
                <span>{post.username}</span>
                <p>Posted {moment (post.date).fromNow()}</p>
            </div>
            {currentUser.username===post.username &&  <div className="edit">
                <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" />
                </Link>
                <Link >
                <img onClick={handleDelete} src={Delete} alt="" />
                </Link>
            </div>}
        </div>
        <h1>{getText(post.title)}</h1>
        {getText(post.desc)}
        </div>
        
        <div ><Menu category={post.category}/></div>
    </div>
  )
}

export default Single