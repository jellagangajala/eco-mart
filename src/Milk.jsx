import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart } from './store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './milk.css'; // ✅ Import milk section styles

function Milk() {
  const milkList = useSelector((state) => state.products.Milk);
  const dispatch = useDispatch();

  const priceRanges = [
    { value: 'Rs 1 to Rs 50', min: 1, max: 50 },
    { value: 'Rs 51 to Rs 100', min: 51, max: 100 },
    { value: 'Rs 101 to Rs 200', min: 101, max: 200 },
    { value: 'Rs 201 to Rs 500', min: 201, max: 500 },
    { value: 'more than Rs 500', min: 501, max: Infinity },
  ];

  const [selectedRanges, setSelectedRanges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleCheckboxChange = (rangeValue) => {
    setSelectedRanges((prev) =>
      prev.includes(rangeValue)
        ? prev.filter((r) => r !== rangeValue)
        : [...prev, rangeValue]
    );
    setCurrentPage(1);
  };

  const clearAll = () => setSelectedRanges([]);

  const activeRanges = priceRanges.filter((range) =>
    selectedRanges.includes(range.value)
  );

  const filteredMilkList =
    selectedRanges.length === 0
      ? milkList
      : milkList.filter((item) =>
          activeRanges.some(
            (range) => item.price >= range.min && item.price <= range.max
          )
        );

  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMilkList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMilkList.length / itemsPerPage);

  const goToPage = (page) => setCurrentPage(page);

  return (
    <div className="milk-section">
      <h2>Dairy Products</h2>

      <div className="milk-content">
        {/* Milk Products Section */}
        <div className="milk-scroll-container">
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <div className="milk-card" key={index}>
                <img
                  src={import.meta.env.BASE_URL + 'images/' + item.image}
                  alt={item.name}
                />
                <div className="milk-name">{item.name}</div>
                <div className="milk-price">₹{item.price.toFixed(2)}</div>
                <button
                  onClick={() => {
                    dispatch(AddToCart(item));
                    toast.success(`${item.name} added to cart!`, {
                      position: 'top-right',
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: true,
                    });
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p>No milk products in this price range.</p>
          )}
        </div>

        {/* Filter Section */}
        <div className="filter-section">
          <h4>Price Ranges</h4>
          {priceRanges.map((range) => (
            <label key={range.value} style={{ display: 'block' }}>
              <input
                type="checkbox"
                checked={selectedRanges.includes(range.value)}
                onChange={() => handleCheckboxChange(range.value)}
              />
              {range.value}
            </label>
          ))}
          <button onClick={clearAll} style={{ marginTop: '10px' }}>
            Clear All
          </button>
        </div>
      </div>

      {/* Pagination */}
      <div className="pagination-controls">
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => goToPage(index + 1)}
            style={{
              fontWeight: currentPage === index + 1 ? 'bold' : 'normal',
            }}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Milk;
