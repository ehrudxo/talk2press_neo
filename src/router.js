import routes from './routes';
import {
  create as createRouter,
  HashLocation
} from 'react-router';
//because of express we use. Only HashLocation enables.
const location = HashLocation;

export default createRouter({ routes, location });
