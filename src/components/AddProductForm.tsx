import React, { useState } from 'react';
import { useAppDispatch } from '../hooks';
import { addProduct } from '../features/products/productSlice';
import API from '../api';
import './AddProductForm.scss';

interface AddProductFormProps {
  onClose: () => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();

  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct = {
      name: productName,
      description: description,
      price: parseFloat(price),
      quantity: quantity,
    };

    try {
      const res = await API.post('/products/', newProduct);
      dispatch(addProduct(res.data));
      onClose();
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  return (
    <div className="modal">
      <div className="modal__content">
        <h3>Add Product</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
          <textarea placeholder="Product Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))} // Ensure quantity is a number
          />
          <div className="actions">
            <button type="submit">Add Product</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
