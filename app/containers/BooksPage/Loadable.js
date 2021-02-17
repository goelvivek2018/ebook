/**
 *
 * Asynchronously loads the component for BooksPage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
