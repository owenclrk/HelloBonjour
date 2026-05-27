import React, {useState, useEffect} from 'react'
import api from './api'
import './App.css';

const App = () => {
//Update results database
const [results, setResults] = useState([]);
//Show and expand the history section
const [showHistory, setShowHistory] = useState(false);

// const [questions, setQuestions] = useState({
//   prompt: '',
//   answer: ''
// });
// const [questions, setQuestions] = useState([])

//Form entry. By default french is set.
const [formData, setFormData] = useState({
  text: '',
  result: '',
  lang: 'FR'
});




const fetchResults = async () => {
  const response = await api.get('/dict/');
  setResults(response.data)
};

// const fetchQuestions = async () => {
//   const questions = await api.get('/questions/')
//   setQuestions(questions.data)
// }

  //   const fetchQuestions = async () => {
  //   const questions = await api.post('/dict/');
  //   setQuestions(questions.data)
  // };

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

  // const handleQuestions = async (event) => {
  //   event.preventDefault();
  //   await api.post('/questions/', formData);
  //   console.log('formData',formData);
  //   fetchQuestions();
  // }
  


return (
  //Container
<div className="app-container">

  <div className="card">
    <h1 className="title">HelloBonjour</h1>
    <h2 className="sub-heading">Helping intermediate/advanced language learners</h2>
  <form className="item-form" onSubmit={handleFormSubmit}>
      <div className="input-group">
        <label>Word to Be Translated</label>
        <input
          type='text'
          className='form-control'
          id='text'
          name='text'
          onChange={handleInputChange}
          value={formData.text}
          required
          placeholder='Word to be translated'
        />
      </div>
      <div className="input-group">
        <label>Language</label>
        <select
          className='form-select'
          id='lang'
          name='lang'
          value={formData.lang} 
          onChange={handleInputChange}
          required
        >
        # Need to add default or else react won't update the table
        <option value="" disabled>Select a language</option> {/* Placeholder */}
        <option value="FR"> French</option>
        <option value="EN-GB"> English </option>
        </select>
      </div>
      <button type="submit" className="submit-btn">Submit</button>

    </form>

    <h2 className="translation">Translation</h2>

    {/* Add a table for the latest translation. Two tables side by side to show the latest translation */}
    <div className='translation_table'>
      {/* Show the latest translation */}
      <div className="latest-translation">
        {results.length > 0 ? results[0].text : '—'}
      </div>
      {/* Show the latest translation */}
      <div className="latest-translation">
        {results.length > 0 ? results[0].result : '—'}
      </div>
    </div>

    {/* Show or Hide the History button */}
    <div className='history-header' onClick={() => setShowHistory(!showHistory)}>
    <h3 className='hideButton'>{showHistory ? 'Hide History' : 'Show History'}</h3>
    </div>

    {/* History table */}
    {showHistory && (
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
                  <td className="fw-medium">{result.text}</td>
                  <td className="text-muted">{result.lang}</td>
                  <td className="text-primary fw-bold">{result.result}</td>
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
        </div>)}
      
      {/* End of history page */}
      {/* Generate list of questions */}
      {/* <button onClick={() => handleQuestions()} className="submit-btn">
        Generate Questions
      </button> */}
      </div>
    </div>
  );
}

export default App;