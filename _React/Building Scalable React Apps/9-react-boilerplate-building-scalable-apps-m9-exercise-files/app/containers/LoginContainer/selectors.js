import { createSelector } from 'reselect';

/**
 * Direct selector to the loginContainer state domain
 */
const selectLoginContainerDomain = () => state => state.get('loginContainer');

/**
 * Other specific selectors
 */


/**
 * Default selector used by LoginContainer
 */

const selectLoginContainer = () => createSelector(
  selectLoginContainerDomain(),
  (substate) => (substate ? substate.toJS() : {})
);

export default selectLoginContainer;
export {
  selectLoginContainerDomain,
};
