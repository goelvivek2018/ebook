/**
 *
 * Asynchronously loads the component for GoogleAuth
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
