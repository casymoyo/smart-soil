import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate();
  
  const handleLogin = (e)=>{
    e.preventDefault()
    const validationErrors = {}
    if(!username){
        validationErrors.username = "Field cant be empty"
    }
    if(!password){
        validationErrors.password = "Field cant be empty"
    }

    if(Object.keys(validationErrors).length === 0){
        setErrors({})
        console.log('')    
        setIsLoggedIn(true)
        navigate('/')
        
    }else{
        setErrors(validationErrors)
    }
  }
  return (
    <div className='login d-flex justify-content-center flex-column align-items-center' style={{'height': '100vh'}}>
        <h2 className='fw-bold text-light'>Smart Soil Analysis System</h2>
        <form className='p-5 shadow mt-3' onSubmit={handleLogin} style={{'width':'300px'}}>
            <h4 className='text-center mb-5 fw-bold text-light'>Login</h4>
            <div className='row mb-3 mt-2'>
                <input
                    type='text'
                    placeholder='username'
                    className='form-control'
                    onChange={(e)=>{setUsername(e.target.value)}}
                ></input>
                {errors.username && <div className='error-message mt-2 fs-sm' id="id-error" role="alert"><small className='text-danger'>* {errors.username}</small></div>}
            </div>
            <div className='row mb-3'>
                <input
                    type='password'
                    placeholder='password'
                    className='form-control'
                    onChange={(e)=>{setPassword(e.target.value)}}
                />
                {errors.password && <div className='error-message mt-2 fs-sm' id="id-error" role="alert"><small className='text-danger'>* {errors.password}</small></div>}    
            </div>
            <div className='row'>
                <button className='ui button blue'>Login</button>
            </div>
            <p>
                {/* <small>Cant remember the password? 
                    <Link to='mailto:admin@smas.co.zw'> Contact the admin</Link>
                </small> */}
            </p>
        </form>
    </div>
  )
}
