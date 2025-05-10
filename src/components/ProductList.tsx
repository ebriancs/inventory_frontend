import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchProducts, updateProductAsync, deleteProductAsync, Product } from '../features/products/productSlice';
import './ProductList.scss';

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products || []);
  const loading = useAppSelector((state) => state.products.loading);
  const error = useAppSelector((state) => state.products.error);
  const pagination = useAppSelector((state) => state.products.pagination);

  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [updatedProduct, setUpdatedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    dispatch(fetchProducts(currentPage));
  }, [currentPage, dispatch]);

  const handleNextPage = () => {
    if (pagination.next) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pagination.previous) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEditClick = (product: Product) => {
    setEditingProductId(product.id);
    setUpdatedProduct({ ...product });
  };

  const handleSaveClick = () => {
    if (updatedProduct) {
      dispatch(updateProductAsync(updatedProduct));
      setEditingProductId(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Product) => {
    if (updatedProduct) {
      setUpdatedProduct({
        ...updatedProduct,
        [field]: field === 'price' || field === 'quantity' ? Number(e.target.value) : e.target.value,
      });
    }
  };

  return (
    <div className="products">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">Error loading products: {error}</p>
      ) : (
        <div className="products__content">
          {products.length > 0 ? (
            products.map((product: Product) => (
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
                        <span>{product.quantity}</span>
                      </div>
                      <div className="info-item">
                        <span className="label">Price:</span>
                        <span>${product.price}</span>
                      </div>
                    </div>
                    <div className="actions">
                      <button onClick={() => handleEditClick(product)}>Edit</button>
                      <button onClick={() => dispatch(deleteProductAsync(product.id))}>Delete</button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      )}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={!pagination.previous}>
          Previous
        </button>
        <span className="current-page">Page {currentPage}</span>
        <button onClick={handleNextPage} disabled={!pagination.next}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
