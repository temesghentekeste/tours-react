import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import Tours from './Tours';
const url = 'https://course-api.netlify.app/api/react-tours-project';

function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const fetchTours = async () => {
    setLoading(true);

    try {
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false);
      setTours(tours);
      console.log(tours);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const removeTour = (id) => {
    const newTours = tours.filter( tour => tour.id !== id);
    setTours(newTours);
  }

  if(loading) {
    return (
      <main>
      <Loading/>
    </main>
    );
  }

  if(tours.length == 0) {
    return(
      <main className='title'>
        <h2>no tours are available</h2>
        <div className="underline"></div>
        <button className='btn' onClick={ () => fetchTours() }>Refresh </button>
      </main>
    )
  }
  return (
    <main>
      <Tours tours={tours} removeTour = {removeTour}/>
    </main>
  );
}

export default App;
