import React, { useState } from 'react'
import { FaCircle, FaCogs, FaUser, FaUsers} from 'react-icons/fa'
import ReactModal from 'react-modal'
import DeviceConf from './settings/DeviceConf';
import { ToastContainer, toast } from 'react-toastify';
import AddDevice from './settings/AddDevice';
import AddUser from './users/AddUser';
import ChangePassword from './users/ChangePassword';
import { Link } from 'react-router-dom';

export default function SystemSettings() {
    const [open, setOpen] = useState(false);
    const [deviceId, setDeviceId] = useState('')
    const [notification, setNotification] = useState(true)
    const [openAddDevice, setAddDevice] = useState(true)
    const [addUser, setAddUser] = useState(false)
    const [addPassword, setAddPassword] = useState(false)

    const handleOpen = (id) =>{
        setOpen(true)
        setDeviceId(id)
        console.log(deviceId)
    }
    const handleClose = () => setOpen(false)

    const customStyles = {
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          background: '#fefefe',
          color: '#333',
          borderRadius: '20px',
          with: '250px'
        },
    };
    if(notification){
        toast.success('Configuration saved', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        setNotification(false)
    }
  return (
    <div className='container settings mt-4'>
        <div className='content'>
            <div className='row'>
                <h3 className='text-secondary fw-bold mt-3 '><span className='text-secondary'><FaCogs size={35}/></span>
                    <span className='px-2'>System Settings</span>
                </h3>
                <div className='usersettings p-2 d-flex flex-column justify-content-center' style={{'height':'30vh'}}>
                    <div className='d-flex bg-light p-2 justify-content-between align-items-center'>
                        <h5 className=''>User settings</h5>
                        <div>
                            <button className='ui button'>
                                <Link to={'/users'}>
                                    users
                                    <span className='px-2'>
                                        <FaUsers/>
                                    </span>
                                </Link>
                            </button>
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col col-6'>
                            <div className='card bg-secondary'>
                                <div className='card-body text-center' onClick={()=>setAddUser(true)}>
                                    <h6>Add User</h6>
                                </div>
                            </div>
                        </div>

                        <div className='col col-6'>
                            <div className='card bg-secondary' onClick={()=>setAddPassword(true)}>
                                <div className='card-body text-center'>
                                    <h6>Change Password</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row'>
                <div className='usersettings p-2 d-flex flex-column justify-content-center'>
                    <div className='bg-light p-2 d-flex justify-content-between align-items-center'>
                        <h5 className=''>Device settings</h5>
                        <div>
                            <button className='ui button blue small' onClick={()=>{setAddDevice(true)}}>
                                Add Device
                            </button>
                        </div>
                    </div>
                    <table className='table table-sm mt-4'>
                        <thead>
                            <tr>
                                <th>location</th>
                                <th>status</th>
                                <th>actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Center</td>
                                <td>active
                                    <span className='px-2 '><FaCircle color='green'/></span>
                                </td>
                                <td>
                                    <button className='btn btn-light btn-sm' onClick={()=>handleOpen('1')}>
                                        Configure device
                                        <span className='px-2 text-muted'><FaCogs/></span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <ReactModal isOpen={open} style={customStyles}>
                <DeviceConf deviceId={deviceId} setOpen={setOpen} setNotification={setNotification}/>
            </ReactModal>

            <ReactModal isOpen={openAddDevice} style={customStyles}>
                <AddDevice setAddDevice={setAddDevice} setNotification={setNotification}/>
            </ReactModal>

            <ReactModal isOpen={addUser} style={customStyles}>
                <AddUser setAddUser={setAddUser} setNotification={setNotification}/>
            </ReactModal>

            <ReactModal isOpen={addPassword} style={customStyles}>
                <ChangePassword setAddPassword={setAddPassword} setNotification={setNotification}/>
            </ReactModal>
        </div>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"

        />
    </div>
  )
}
