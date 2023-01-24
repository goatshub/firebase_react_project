import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase' //export from the config file not from library
// import { } from 'react-firebase-hooks'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'

export const Navbar = () => {
  const navigate = useNavigate()
  // const [ user, loading, err ] = useAuthState(auth)
  const [ user ] = useAuthState(auth)
  const signOutWithGoogle = async() => {
    await signOut(auth)
    navigate('/')
  }

  return (
    <div className='navbar'>
        Navbar
        <Link className='link' to="/" >home</Link>
        {user ? 
          <Link className='link' to="/create" >Create Post</Link>
          :
          <Link className='link' to="/login" >Log in</Link>  
        }
        {user && <div className='profileDiv'>
          <p> {user?.displayName} </p>
          <img src={user?.photoURL || 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fuser%2F&psig=AOvVaw2wHEBJ3MrF3YvMrfpF3Rfx&ust=1673949488720000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCNjNt_bpy_wCFQAAAAAdAAAAABAE'} alt="profile" width="50" height="50" referrerPolicy='no-referrer' />
          <button onClick={signOutWithGoogle}>Sign out</button>
        </div>}
    </div>
  )
}