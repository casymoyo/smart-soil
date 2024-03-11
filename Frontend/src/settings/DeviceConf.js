import React, { useState } from 'react'
import { FaCheck, FaLock, FaToggleOff, FaToggleOn, FaWifi } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';

export default function DeviceConf({ deviceId, setOpen, setNotification}) {
    const [deviceStatus, setDeviceStatus] = useState(false)
    const [ssid, setSSID] = useState('')
    const [password, setPassword] = useState('')
    const [irrigation, setIrrigation] = useState(false)


    const handleSwitchOff = () =>setDeviceStatus(false)
    const handleSwitchOn = () => setDeviceStatus(true)
      
    const handeSubmit = (e) =>{
        e.preventDefault()
        setOpen(false)
        setNotification(true)
    }

  return (
    <div>
        <div className='d-flex justify-content-between align-items-center'>
        <div>
            {deviceId}
        </div>
        <div>
                {deviceStatus ?(
                    <>
                        <span className='px-2 switch-detail'>Turn on device</span>
                        <span className='switch-icon'>
                            <FaToggleOff size={20}  className='toggle-on text-danger' onClick={handleSwitchOff}/>
                        </span>
                    </>
                )
                :(
                    <>
                        <span className='px-2 switch-detail'>Turn off device</span>
                        <span className='switch-icon on'>
                            <FaToggleOn size={20}  className='toggle-on text-success' onClick={handleSwitchOn}/>
                        </span>
                    </>
                )}
        </div>
        </div>
        <form class="ui form mt-4" onSubmit={handeSubmit}>
            <div class="field">
                <label className='label-with-icon'><FaWifi size={20}/><span className='px-2'>Wi-FI SSID </span></label>
                <input
                    value={ssid}
                    type="text"  
                    placeholder="Wi-FI SSID"
                    onChange={(e)=>setSSID(e.target.value)}
                />
            </div>
            <div class="field">
            <label className='label-with-icon'><FaLock size={20}/><span className='px-2'>Wi-FI Password </span></label>
                <input 
                    value={password}
                    type="password"  
                    placeholder="Wi-FI Password "
                    onChange={(e)=>setPassword(e.target.value)}
                />
            </div>
            <div class="field">
                <div class="d-flex align-items-center">
                    <label>Allow auto irrigation</label>
                    <input 
                        value={irrigation}
                        type="checkbox" 
                        tabIndex="0" 
                        onChange={(e)=>setIrrigation(e.target.value)}
                    />
                </div>
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
                <button class="ui button  w-100" onClick={()=>setOpen(false)}>
                    <span className='px-2'>
                        Cancel
                    </span>
                </button>
            </div>
        </form>
    </div>
  )
}
