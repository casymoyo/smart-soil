import React, { useState } from 'react'
import { FaBarcode, FaCheck, FaJoint } from 'react-icons/fa'

export default function AddDevice({ setAddDevice }) {
    const [deviceId, setDeviceId] = useState('')
    const [path, setPath] = useState('')

    const handeSubmit = () =>{

    }

  return (
    <div className='add-device'>
        <form class="ui form mt-4" onSubmit={handeSubmit}>
            <div class="field">
                <label className='label-with-icon'><FaBarcode size={20}/><span className='px-2'>Device ID </span></label>
                <input
                    value={deviceId}
                    type="text"  
                    placeholder="Device Id"
                    onChange={(e)=>setDeviceId(e.target.value)}
                />
            </div>
            <div class="field">
            <label className='label-with-icon'><FaJoint size={20}/><span className='px-2'>Device path </span></label>
                <input 
                    value={path}
                    type="text"  
                    placeholder="Device Path"
                    onChange={(e)=>setPath(e.target.value)}
                />
            </div>
            <div>
                <button class="ui button w-100">
                    Save
                    <span className='px-2'>
                        <FaCheck size={12} color='green'/>
                    </span>
                </button>
            </div>
            <div className='mt-3'>
                <button class="ui button  w-100" onClick={()=>setAddDevice(false)}>
                    <span className='px-2'>
                        Cancel
                    </span>
                </button>
            </div>
        </form>
    </div>
  )
}
