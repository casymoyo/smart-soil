import React, { useEffect, useState } from 'react'
import { FaCogs, FaTrash, FaUsersCog } from 'react-icons/fa';
import { Search } from 'semantic-ui-react'

export default function Users() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);

    const source = [
        { title: 'Alice', description: 'A content item' },
        { title: 'Bob', description: 'Another content item' },
        { title: 'Charlie', description: 'Yet another content item' },
    ];

    const [users, setUsers] = useState([]); 

    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/users/', { 
        //   headers: {
        //     'Authorization': 'Bearer YOUR_ACCESS_TOKEN', 
        //   },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const fetchedUsers = await response.json();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

    const handleSearch = (e, { value }) => {
    setSearchTerm(value);
    const filteredResults = users.filter((user) =>
      user.username.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filteredResults);
  };
  return (
    <div className='users container'>
        <div className='row'>
            <div className=''>
                <div className='d-flex justify-content-between align-items-center mt-5'>
                    <h3 className='text-secondary fw-bold  '><span className='text-secondary'><FaUsersCog size={35}/></span>
                        <span className='px-2'>System Users</span>
                    </h3>
                    <div className=''>
                    <Search
                        onSearchChange={handleSearch}
                        onResultSelect={(e, { result }) => console.log(result)}
                        results={results}
                        value={searchTerm}
                        placeholder='Search user'
                        />
                    </div>
                </div>
                <table className='table table-striped mt-4'>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>User role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                users.map((user)=>{
                                    return(
                                        <tr key={user.id} className='px-2'>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{user.admin ? 'admin' : 'staff' }</td>
                                            <td>
                                                <button className='ui button red basic small'>
                                                    <span><FaTrash/></span>
                                                    <span className='px-2'>delete</span>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}
