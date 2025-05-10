import React, { useState } from 'react';
import { Product } from '../features/products/productSlice';
import './ProductList.scss';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete }) => {
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [updatedProduct, setUpdatedProduct] = useState<Product | null>(null);

  const handleEditClick = (product: Product) => {
    setEditingProductId(product.id);
    setUpdatedProduct({ ...product });
  };

  const handleSaveClick = () => {
    if (updatedProduct) {
      onEdit(updatedProduct);
      setEditingProductId(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Product) => {
    if (updatedProduct) {
      setUpdatedProduct({
        ...updatedProduct,
        [field]: e.target.value,
      });
    }
  };

  return (
    <div className="products">
      <div className="products__content">
        {products.map((product) => (
          <div key={product.id} className="card">
            {editingProductId === product.id ? (
              <div className="card-edit">
                <input type="text" value={updatedProduct?.name || ''} onChange={(e) => handleChange(e, 'name')} />
                <input type="text" value={updatedProduct?.description || ''} onChange={(e) => handleChange(e, 'description')} />
                <input type="number" value={updatedProduct?.quantity || ''} onChange={(e) => handleChange(e, 'quantity')} />
                <input type="number" value={updatedProduct?.price || ''} onChange={(e) => handleChange(e, 'price')} />
                <button onClick={handleSaveClick}>Save</button>
              </div>
            ) : (
              <div className="card-view">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="product-info">
                  <div className="info-item">
                    <span className="label">Quantity:</span>
                    <span className="quantity">{product.quantity}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Price:</span>
                    <span className="price">${product.price}</span>
                  </div>
                </div>
                <div className="actions">
                  <button onClick={() => handleEditClick(product)}>Edit</button>
                  <button onClick={() => onDelete(product.id)}>Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
