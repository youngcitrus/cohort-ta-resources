import {useParams, Redirect} from 'react-router-dom';

function MovieDetails({movies}) {
  const {id} = useParams();
  const choice = movies.find((movie) => movie.id === +id);

  if (!choice) {
    return <Redirect to='/' />;
  }
  return (
    <div className="comp purple">
      <h1>{choice.title}</h1>
      <p>{choice.description}</p>
    </div>
  );
}

export default MovieDetails;
