import { createSelector } from 'reselect';
import selectLoginContainer from '../LoginContainer/selectors';

/**
 * Direct selector to the navigationContainer state domain
 */
const selectNavigationContainerDomain = () => state => state.get('navigationContainer');

/**
 * Other specific selectors
 */


/**
 * Default selector used by NavigationContainer
 */

const selectNavigationContainer = () => createSelector(
  selectNavigationContainerDomain(),
  selectLoginContainer(),
  (substate, loginSubstate) => Object.assign(substate.toJS(), loginSubstate)
);

export default selectNavigationContainer;
export {
  selectNavigationContainerDomain,
};
