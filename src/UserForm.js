import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from './redux/userSlice';

const UserForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    registerNumber: '',
    name: '',
    mobileNumber: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(formData));
    setFormData({ registerNumber: '', name: '', mobileNumber: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="registerNumber" placeholder="Register Number" value={formData.registerNumber} onChange={handleChange} required />
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input type="text" name="mobileNumber" placeholder="Mobile Number" value={formData.mobileNumber} onChange={handleChange} required />
      <button type="submit">Add User</button>
    </form>
  );
};

export default UserForm;
