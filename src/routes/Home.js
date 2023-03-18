import Movie from "../components/Movie";
import {useState, useEffect} from "react";
import styles from "./Home.module.css";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async() => {
    const json = await(
      await fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year`
    )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  }
  useEffect(() => {
    getMovies()
  }, [])

  return <div className={styles.container}>
      {loading ? (
      <div className={styles.loader}>
        <span>Loading...</span>
        </div>
      ) : (
      <div className={styles.movies}>
        {movies.map((movie) => (
        <Movie 
        key={movie.id}
        id={movie.id}
        yeaer={movie.year}
        // key는 react에서만, map 안에서 component를 render 할 때 사용
        coverImg={movie.medium_cover_image} 
        title={movie.title} 
        genres={movie.genres}
        />
      ))}
      </div>
      )}
  </div>
}

export default Home;