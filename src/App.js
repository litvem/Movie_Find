import { useState, useEffect } from 'react';

import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

// API URL to movie DB
const API_URL = 'http://www.omdbapi.com?apikey=ba604c3a';

// Main functional component
const App = () => {
    // Add state with empty array of movies
    const [movies, setMovies] = useState([]);
    // Add state with empty search terms
    const [searchTerm, setSearchTerm] = useState('');

    // Asynchronous function that requires time to load the movies that will search for movies based om given title
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        // Get the data from the response
        const data = await response.json();
        setMovies(data.Search);
    }

    // Load data from DB as the page loads
    useEffect(() => {
        searchMovies('Frozen');
    }, []);
    // Render page
    return (
        <div className='app'>
            <h1>MovieFind</h1>
            
            <div className='searchBar'>
                <input 
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img 
                    src={SearchIcon}
                    alt='search'
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0
                ? (
                    <div className='container'>
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className='empty'>
                        <h2>No movies found</h2>
                    </div>
                )}
        </div>
    );
}

export default App;