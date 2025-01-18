import React, { useState, useEffect } from 'react'
import { users_api, UpdateUserData } from '../api/Users-api'
import  useFetch from '../hooks/useFetch'

const UsersList: React.FC = () => {
    const { loading, data: users, error } = useFetch(users_api.getAllUsers);
    if (loading) return <div>Loading users...</div>;
    if (error) return <div>Error: {error}</div>;

  return (
    <div>
        <h1>UsersList</h1>
        <ul>
            {users?.map((user) => (
                <li key={user.id}>
                    <div>{user.userName}</div>
                    <div>{user.firstName}</div>
                    <div>{user.lastName}</div>
                    <div>{user.email}</div>
                    <div>{user.phoneNumber}</div>
                    <div>{user.imageUrl}</div>
                </li>
            ))}
        </ul>
        
        </div>
  )
}

export default UsersList;