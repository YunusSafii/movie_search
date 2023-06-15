import './App.css';
import { getMovieList, searchMovie } from './api'
import { useEffect, useState } from 'react'

const App = () => {
  const [popularMovies, setpopularMovies] = useState([])

  useEffect(() => {
    getMovieList().then((result) => {
      setpopularMovies(result)
    })
  }, [])

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      if (movie.poster_path != null) {
        return (
          <div className="Movie-wrapper" key={i}>
            <div className="Movie-title">{movie.title}</div>
            <img src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`} alt="" className="Movie-image"></img>
            <div className="Movie-date">{movie.release_date}</div>
            <div className="Movie-rate">{movie.vote_average}</div>
          </div>
        )
      }      
    })
  }

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);
      setpopularMovies(query.results);
      console.log({ query: query })
    } else if (q.length == 0) {
      getMovieList().then((result) => {
        setpopularMovies(result);
      });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>YUNUS MOVIE MANIA</h1>
        <input type="text"
          placeholder='Mau cari Movie apa kak..'
          className='Movie-search'
          onChange={({ target }) => search(target.value)} />
        <div className="Movie-container">
          <PopularMovieList />
        </div>
      </header>
    </div>
  );
}

export default App;
