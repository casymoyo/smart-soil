import React, { useEffect } from 'react'
import { useState } from 'react'
import { FaLock, FaLockOpen, FaMailBulk, FaUser } from 'react-icons/fa'
import { Dropdown } from 'semantic-ui-react'

export default function AddUser( { setAddUser, setNotification } ) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [is_admin, setUserPosition] = useState('admin')

    const options = [
        {key:'1', value:'true', text: 'admin'},
        {key:2, value:'false', text:'staff'}
    ]

    const handlePositionChange = (e, data) => {
        setUserPosition(data.value);
      };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!username || !email || !password || !password2 || !is_admin) {
          console.log('Please fill in all required fields.');
          return;
        }
    
        if (password !== password2) {
          alert('Passwords do not match.');
          return;
        }
    
        try {
          const response = await fetch('http://127.0.0.1:8000/api/register/user/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
              username,
              email,
              password,
              password2,
              is_admin
            }),
          });
    
          if (response.ok) {
            setNotification(true)
            setUsername('');
            setEmail('');
            setPassword('');
            setPassword2('');
            setUserPosition('');
            console.log('success')
          } else {
            let errorResponse = await response.json();
            alert(errorResponse.error || 'An error occurred.'); 
          }
        } catch (error) {
          console.error('Error creating user:', error); 
          alert('An unexpected error occurred. Please try again later.');
        }
      }

  return (
    <div className='add-user w-100'>
        <form class="ui form mt-4" onSubmit={handleSubmit} style={{'width':'300px'}}>
            <div class="field">
                <label className='label-with-icon'><FaUser size={20}/><span className='px-2'>Username </span></label>
                <input
                    value={username}
                    type="text"  
                    placeholder="username"
                    onChange={(e)=>setUsername(e.target.value)}
                />
            </div>
            <div class="field">
            <label className='label-with-icon'><FaMailBulk size={20}/><span className='px-2'>Email </span></label>
                <input 
                    value={email}
                    type="text"  
                    placeholder="email"
                    onChange={(e)=>setEmail(e.target.value)}
                />
            </div>
            <div class="field">
            <label className='label-with-icon'><FaLock size={20}/><span className='px-2'>Password </span></label>
                <input 
                    value={password}
                    type="password"  
                    placeholder="password"
                    onChange={(e)=>setPassword(e.target.value)}
                />
            </div>
            <div class="field">
            <label className='label-with-icon'><FaLock size={20}/><span className='px-2'>Confirm Password </span></label>
                <input 
                    value={password2}
                    type="password"  
                    placeholder="Confirm password"
                    onChange={(e)=>setPassword2(e.target.value)}
                />
            </div>
            <div class="field">
            <label className='label-with-icon'><FaLockOpen size={20}/><span className='px-2'>Position </span></label>
                <Dropdown
                    placeholder='Select user position'
                    fluid
                    selection
                    value={is_admin}
                    options={options}
                    onChange={handlePositionChange}
                />
            </div>
            <div>
                <button class="ui button w-100">
                    create user
                </button>
            </div>
            <div className='mt-3'>
                <button class="ui button  w-100" onClick={()=>setAddUser(false)}>
                    <span className='px-2'>
                        Cancel
                    </span>
                </button>
            </div>
        </form>
    </div>
  )
}
