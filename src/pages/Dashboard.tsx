import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Product, setProducts, updateProduct, deleteProduct } from '../features/products/productSlice';
import API from '../api';
import Navbar from '../components/Navbar';
import AddProductForm from '../components/AddProductForm';
import ProductList from '../components/ProductList';
import './Dashboard.scss';

const Dashboard = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products.items);
  const token = useSelector((state: any) => state.auth.token);

  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await API.get('/products/');
      dispatch(setProducts(res.data));
    };

    if (token) fetchProducts();
  }, [token, dispatch]);

  const handleEdit = (updatedProduct: Product) => {
    const updateProductInAPI = async () => {
      try {
        console.log('Dashboard -> handleEdit:', updatedProduct);
        const res = await API.put(`/products/${updatedProduct.id}/`, updatedProduct);
        dispatch(updateProduct(res.data));
      } catch (error) {
        console.error('Error updating product:', error);
        alert('Failed to update product');
      }
    };
    updateProductInAPI();
  };

  const handleDelete = async (productId: number) => {
    try {
      await API.delete(`/products/${productId}/`);
      dispatch(deleteProduct(productId));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

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
          <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
