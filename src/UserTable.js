import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, deleteUser, updateUser, selectUsers } from './redux/userSlice';

const UserTable = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleEdit = (user) => {
    setEditUser(user);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedUser = {
      registerNumber: editUser.registerNumber,
      name: editUser.name,
      mobileNumber: editUser.mobileNumber,
    };
    dispatch(updateUser({ id: editUser._id, user: updatedUser }));
    setEditUser(null);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div>
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>Register Number</th>
            <th>Name</th>
            <th>Mobile Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user._id}>
              <td>{user.registerNumber}</td>
              <td>{user.name}</td>
              <td>{user.mobileNumber}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setCurrentPage(prev => prev - 1)} disabled={currentPage === 1}>Previous</button>
        <button onClick={() => setCurrentPage(prev => prev + 1)} disabled={currentPage * usersPerPage >= users.length}>Next</button>
      </div>
      {editUser && (
        <form onSubmit={handleUpdate}>
          <input type="text" name="registerNumber" value={editUser.registerNumber} onChange={e => setEditUser({ ...editUser, registerNumber: e.target.value })} required />
          <input type="text" name="name" value={editUser.name} onChange={e => setEditUser({ ...editUser, name: e.target.value })} required />
          <input type="text" name="mobileNumber" value={editUser.mobileNumber} onChange={e => setEditUser({ ...editUser, mobileNumber: e.target.value })} required />
          <button type="submit">Update User</button>
        </form>
      )}
    </div>
  );
};

export default UserTable;
