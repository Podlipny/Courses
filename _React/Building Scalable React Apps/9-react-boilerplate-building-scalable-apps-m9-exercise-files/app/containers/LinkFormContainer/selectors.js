import { createSelector } from 'reselect';

/**
 * Direct selector to the linkFormContainer state domain
 */
const selectLinkFormContainerDomain = () => state => state.get('linkFormContainer');

/**
 * Other specific selectors
 */

const selectRouteTopic = () => (state, props) => props.params.topicName;


/**
 * Default selector used by LinkFormContainer
 */

const selectLinkFormContainer = () => createSelector(
  selectLinkFormContainerDomain(),
  selectRouteTopic(),
  (substate, topicName) => Object.assign(substate.toJS(), { topicName })
);

export default selectLinkFormContainer;
export {
  selectLinkFormContainerDomain,
};
