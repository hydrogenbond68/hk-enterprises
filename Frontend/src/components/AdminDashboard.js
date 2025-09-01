import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Context from "../Context";
import AddProduct from './AddProduct';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const { addProduct } = useContext(Context);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/users', { headers: { Authorization: `Bearer ${token}` } });
      setUsers(res.data.users);
    };
    fetchUsers();
  }, []);

  return (
    <div className="section">
      <h2 className="title">Admin Dashboard</h2>
      <div className="box">
        <h3>Registered Customers: {users.length}</h3>
        <table className="table is-striped">
          <thead>
            <tr><th>Email</th><th>Registered At</th></tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}><td>{user.email}</td><td>{new Date(user.registeredAt).toLocaleDateString()}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="box">
        <h3>Add Product</h3>
        <AddProduct /> {/* Existing component */}
      </div>
    </div>
  );
};

export default AdminDashboard;