//build an articleReducer
import articles from '../data/data.json';

const GET_ARTICLES = 'article/getArticles';
//add article constant
const ADD_ARTICLE = 'article/addArticle';

//add article action creator
export const addArticle = (newArticle) => {
  return { type: ADD_ARTICLE, newArticle: newArticle };
};

export const getArticles = () => {
  return {
    type: GET_ARTICLES,
    articles
  };
};

//action
// {
//   type: 'article/getArticles',payload:articles
// }

const initialState = { articles: [], isLoading: true };

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTICLES:
      return { ...state, articles: [...action.articles] };
    //add article case
    case ADD_ARTICLE:
      return { ...state, articles: [...state.articles, action.newArticle] };
    default:
      return state;
  }
};

export default articleReducer;
