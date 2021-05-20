// add parameter function
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import './SingleArticle.css';

const SingleArticle = ({ articles }) => {
  //get id from params
  const { id } = useParams();

  // const articles = useSelector((state) => state.articleState.articles);

  const singleArticle = articles.find((article) => article.id === id);

  //create selector to retrieve state
  return (
    <div className='singleArticle'>
      <h1>{singleArticle?.title}</h1>
      <img src={singleArticle?.imageUrl} alt='home' />
      <p>{singleArticle?.body}</p>
    </div>
  );
};
export default SingleArticle;
