import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './veg.css';
import { AddToCart } from './store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Veg() {
  const vegList = useSelector((globalState) => globalState.products.Veg);
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
    if (selectedRanges.includes(rangeValue)) {
      setSelectedRanges(selectedRanges.filter((r) => r !== rangeValue));
    } else {
      setSelectedRanges([...selectedRanges, rangeValue]);
    }
    setCurrentPage(1);
  };

  const clearAll = () => setSelectedRanges([]);

  const activeRanges = priceRanges.filter((range) =>
    selectedRanges.includes(range.value)
  );

  const filteredVegList =
    selectedRanges.length === 0
      ? vegList
      : vegList.filter((item) =>
          activeRanges.some(
            (range) => item.price >= range.min && item.price <= range.max
          )
        );

  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredVegList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredVegList.length / itemsPerPage);

  const goToPage = (page) => setCurrentPage(page);

  const vegCards = currentItems.map((item, index) => (
    <div className="veg-card" key={index}>
      <img
  src={import.meta.env.BASE_URL + 'images/' + item.image}
  alt={item.name}
     />
      <div className="veg-name">{item.name}</div>
      <div className="veg-price">₹{item.price.toFixed(2)}</div>
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
            progress: undefined,
          });
        }}
      >
        Add to Cart
      </button>
    </div>
  ));

  return (
    <div className="veg-section">
      <h2>Fresh Vegetables</h2>

      <div className="veg-content">
        <div className="veg-scroll-container">
          {vegCards.length > 0 ? vegCards : <p>No vegetables in this price range.</p>}
        </div>

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

      <div className="pagination-controls">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => goToPage(index + 1)}
            style={{
              margin: '0 5px',
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

export default Veg;
