import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import '../styles/ProductPage.css';

// Mock data - replace with actual API call in production
const mockProducts = [
  {
    id: 1,
    name: "Smartphone X",
    price: 799.99,
    image: "/images/smartphone.jpg",
    description: "A flagship smartphone with the latest technology. Features include a high-resolution display, powerful processor, and advanced camera system."
  },
  {
    id: 2,
    name: "Laptop Pro",
    price: 1299.99,
    image: "/images/laptop.jpg",
    description: "A professional-grade laptop designed for creative work and productivity. Features a high-resolution display, fast processor, and ample storage."
  },
  {
    id: 3,
    name: "Wireless Headphones",
    price: 149.99,
    image: "/images/headphones.jpg",
    description: "Premium wireless headphones with active noise cancellation, long battery life, and exceptional sound quality for an immersive audio experience."
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 249.99,
    image: "/images/smartwatch.jpg",
    description: "A versatile smartwatch with health tracking, notifications, and apps. Water-resistant design with long battery life for all-day use."
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    price: 89.99,
    image: "/images/speaker.jpg",
    description: "Portable Bluetooth speaker with rich, clear sound and long battery life. Water-resistant design makes it perfect for outdoor use."
  },
  {
    id: 6,
    name: "Tablet Mini",
    price: 399.99,
    image: "/images/tablet.jpg",
    description: "Compact tablet with a high-resolution display, powerful performance, and long battery life. Perfect for entertainment, reading, and productivity on the go."
  }
];

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = () => {
      setLoading(true);
      
      // In a real app, replace this with actual API call
      setTimeout(() => {
        try {
          const foundProduct = mockProducts.find(p => p.id === parseInt(id));
          
          if (foundProduct) {
            setProduct(foundProduct);
          } else {
            setError("Product not found");
          }
          
          setLoading(false);
        } catch (error) {
          setError("Failed to load product. Please try again later.");
          setLoading(false);
        }
      }, 1000);
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading product...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  return (
    <div className="product-page">
      <div className="product-container">
        <div className="product-image-container">
          {product.image ? (
            <img src={product.image} alt={product.name} className="product-image" />
          ) : (
            <div className="placeholder-image">No image available</div>
          )}
        </div>
        
        <div className="product-details">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-price">${product.price.toFixed(2)}</p>
          
          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
          
          <div className="product-actions">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
              />
            </div>
            
            <button 
              className="btn-add-to-cart"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
          
          <p className="stock-info">In stock - Ready to ship</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;