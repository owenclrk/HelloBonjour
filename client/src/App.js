import React, {useState, useEffect} from 'react'
import api from './api'
import './App.css';

const App = () => {
  const [results, setResults] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: ''
  });

  const fetchResults = async () => {
    const response = await api.get('/dict/');
    setResults(response.data)
  };

  useEffect(() => {
    fetchResults();
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
    await api.post('/dict/', formData);
    console.log('formData',formData);
    fetchResults();
    setFormData({
      text: '',
      result: '',
      lang: ''
    });
  };

  const handleDelete = async (id) => {
      try {
        await api.delete(`/dict/${id}`); // Ensure your FastAPI route is @app.delete("/dict/{item_id}")
        fetchResults(); // Refresh the list after deleting
      } catch (error) {
        console.error("Error deleting item:", error);
        alert (error)
        alert("Failed to delete the item.");
      }
  };

return (
<div className="app-container">
  <div className="card">
    <h1 className="title">Translation Dictionary</h1>

  <form className="item-form" onSubmit={handleFormSubmit}>
      <div className="input-group">
        <label>Word to Be Translated</label>
        <input
          type='text'
          className='form-control'
          id='name'
          name='name'
          onChange={handleInputChange}
          value={formData.name}
          required
          placeholder='Word to be translated'
        />
      </div>

      <div className="input-group">
        <label>Language</label>
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


      <button type="submit" className="submit-btn">Submit</button>
    </form>

        {/* 3. Centered Table Section */}
          <h2 className="subtitle">Translation List</h2>
              <div className="table-container">
                <table className="items-table">
                <thead className='table-primary'>
                  <tr>
                    <th>Word</th>
                    <th>Language</th>
                    <th>Translation</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody className="align-middle">
                  {results.map((result) => (
                    <tr key={result.id}>
                      <td className="fw-medium">{result.word}</td>
                      <td className="text-muted">{result.language}</td>
                      <td className="text-primary fw-bold">€{result.translation}</td>
                      <td>
                        <button onClick={() => handleDelete(result.id)} className="btn btn-outline-danger btn-sm px-3">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {results.length === 0 && (
                    <tr>
                      <td colSpan="3" className="text-center py-4 text-muted">
                        No translation found. Add one above!
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