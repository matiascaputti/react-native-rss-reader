import { createRouter } from '@exponent/ex-navigation';
import RssListScreen from '../screens/RssListScreen';
import FeedScreen from '../screens/FeedScreen';
import EntryScreen from '../screens/EntryScreen';

const Router = createRouter(() => ({
  rssList: () => RssListScreen,
  feed: () => FeedScreen,
  entry: () => EntryScreen
}));

export default Router;
