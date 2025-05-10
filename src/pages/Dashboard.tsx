import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import AddProductForm from '../components/AddProductForm';
import ProductList from '../components/ProductList';
import './Dashboard.scss';

const Dashboard = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="dashboard">
      <Navbar />
      <main>
        <div className="dashboard__header">
          <h2>Products</h2>
          <button className="add-button" onClick={() => setShowAddModal(true)}>
            Add Product
          </button>
        </div>
        <div className="dashboard__content">
          {showAddModal && <AddProductForm onClose={() => setShowAddModal(false)} />}
          <ProductList />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
