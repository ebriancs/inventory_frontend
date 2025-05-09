import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../features/products/productSlice';
import API from '../api';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products.items);
  const token = useSelector((state: any) => state.auth.token);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!token) return;
      try {
        const response = await API.get('/products/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setProducts(response.data));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <h2>Dashboard</h2>
      <ul>
        {products.map((p: { id: string; name: string; price: number }) => (
          <li key={p.id}>
            {p.name} - ${p.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
