import React, {useState, useEffect} from 'react'
import api from './api'
import './App.css';

const App = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: ''
  });

  const fetchItems = async () => {
    const response = await api.get('/items/');
    setItems(response.data)
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await api.post('/items/', formData);
    console.log('formData',formData);
    fetchItems();
    setFormData({
      name: '',
      description: '',
      price: ''
    });
  };
x

  const handleDelete = async (itemId) => {
      try {
        await api.delete(`/items/${itemId}`); // Ensure your FastAPI route is @app.delete("/items/{item_id}")
        fetchItems(); // Refresh the list after deleting
      } catch (error) {
        console.error("Error deleting item:", error);
        alert (error)
        alert("Failed to delete the item.");
      }
  };

return (
<div className="app-container">
  <div className="card">
    <h1 className="title">Shopping Wishlist</h1>

  <form className="item-form" onSubmit={handleFormSubmit}>
      <div className="input-group">
        <label>Item Name</label>
        <input
          type='text'
          className='form-control'
          id='name'
          name='name'
          onChange={handleInputChange}
          value={formData.name}
          required
        />
      </div>

      <div className="input-group">
        <label>Item Description</label>
        <input
          type='text'
          className='form-control'
          id='description'
          name='description'
          onChange={handleInputChange}
          value={formData.description}
          required
        />
      </div>

      <div className="input-group">
        <label>Item Price</label>
        <input
          type='text'
          className='form-control'
          id='price'
          name='price'
          onChange={handleInputChange}
          value={formData.price}
          placeholder='0.0'
          required
        />
      </div>

      <button type="submit" className="submit-btn">Submit</button>
    </form>

        {/* 3. Centered Table Section */}
          <h2 className="subtitle">Items List</h2>
              <div className="table-container">
                <table className="items-table">
                <thead className='table-primary'>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody className="align-middle">
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className="fw-medium">{item.name}</td>
                      <td className="text-muted">{item.description}</td>
                      <td className="text-primary fw-bold">€{item.price}</td>
                      <td>
                        <button onClick={() => handleDelete(item.id)} className="btn btn-outline-danger btn-sm px-3">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {items.length === 0 && (
                    <tr>
                      <td colSpan="3" className="text-center py-4 text-muted">
                        No items found. Add one above!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
  );
}

export default App;