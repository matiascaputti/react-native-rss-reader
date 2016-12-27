import { createRouter } from '@exponent/ex-navigation';
import RssListScreen from '../screens/RssListScreen';
import FeedScreen from '../screens/FeedScreen';
import ArticleScreen from '../screens/ArticleScreen';

const Router = createRouter(() => ({
  rssList: () => RssListScreen,
  feed: () => FeedScreen,
  article: () => ArticleScreen
}));

export default Router;
