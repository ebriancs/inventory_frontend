import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { addProductAsync, NewProduct } from '../features/products/productSlice';
import './AddProductForm.scss';

interface AddProductFormProps {
  onClose: () => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.products.loading);
  const error = useAppSelector((state) => state.products.error);

  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct: NewProduct = {
      name: productName,
      description: description,
      price: parseFloat(price),
      quantity: quantity,
    };

    try {
      await dispatch(addProductAsync(newProduct)).unwrap();
      onClose();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal__content">
        <h3>Add Product</h3>
        {error && <p className="error">Error: {error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            disabled={loading} // Disable input if loading
          />
          <textarea
            placeholder="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading} // Disable input if loading
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            disabled={loading} // Disable input if loading
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            disabled={loading} // Disable input if loading
          />

          <div className="actions">
            <button type="submit" disabled={loading}>
              {loading ? 'Adding Product...' : 'Add Product'}
            </button>
            <button type="button" onClick={onClose} disabled={loading}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
