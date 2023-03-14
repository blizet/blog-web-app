import {createBrowserRouter,RouterProvider, Outlet, } from 'react-router-dom';
import './App.css';
import Login from "../src/pages/Login"
import Register from './pages/Register';
import Single from './pages/Single';
import Write from './pages/Write';
import Home from './pages/Home';
import Footer from './components/Footer';
import Header from './components/Navbar';
import "./style.scss";

function App() {

  const router=createBrowserRouter([
    {path:"/",
  element:<Layout/>,
  children:[
    {
      path:"/",
      element:<Home/>
    },
    
    {
      path:"/post/:id",
      element:<Single/>
    },
    {
      path:"/write",
      element:<Write/>
    }
    
  ]
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/register",
    element:<Register/>
  }
  ])
  return (
  <div className='app'>
    <div className='container'>
    <RouterProvider router={router}/>
    </div>
    
  </div>
  );
}

const Layout=()=>{
  return(
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default App;
