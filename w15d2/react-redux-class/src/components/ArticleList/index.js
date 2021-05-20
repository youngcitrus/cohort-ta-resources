import { useEffect } from 'react';

//dispatch an action using useDispatch hook and getArticles action from the store
import { useDispatch, useSelector } from 'react-redux';
import { getArticles } from '../../store/articleReducer';

import { Route, Switch } from 'react-router-dom';
import SingleArticle from '../SingleArticle';
import ArticleDetail from '../ArticleDetail';

const ArticleList = () => {
  const dispatch = useDispatch();

  const articles = useSelector((state) => console.log(state.fruitState[0]));
  // const allState = useSelector((state) => state);
  // console.log('articles', articles);

  useEffect(() => {
    dispatch(getArticles());
  }, [dispatch]);

  return (
    <div>
      {console.log('re-render')}
      <h1>ArticleList</h1>
      <ol>
        <li>nothing</li>
        {/* {articles.map(({ title, id }) => (
          <ArticleDetail key={id} id={id} title={title} />
        ))} */}
      </ol>

      <Switch>
        <Route path='/article/:id'>
          <SingleArticle />
        </Route>
      </Switch>
    </div>
  );
};
export default ArticleList;
