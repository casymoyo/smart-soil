import React, { useState } from 'react'
import { FaLock, FaLockOpen } from 'react-icons/fa'

export default function ChangePassword( { setAddPassword, setNotification } ) {
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const handeSubmit = (e) =>{
        e.preventDefault()
        setAddPassword(false)
        setNotification(true)
    }
  return (
    <div className='change-password'>
        <form class="ui form mt-4" onSubmit={handeSubmit}>
            <div class="field">
            <label className='label-with-icon'><FaLockOpen size={20}/><span className='px-2'>Enter new password</span></label>
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
                    placeholder="confirm password"
                    onChange={(e)=>setPassword2(e.target.value)}
                />
            </div>
            <div>
                <button class="ui button w-100">
                    change password
                </button>
            </div>
            <div className='mt-3'>
                <button class="ui button  w-100" onClick={()=>setAddPassword(false)}>
                    <span className='px-2'>
                        Cancel
                    </span>
                </button>
            </div>
        </form>
    </div>
  )
}
