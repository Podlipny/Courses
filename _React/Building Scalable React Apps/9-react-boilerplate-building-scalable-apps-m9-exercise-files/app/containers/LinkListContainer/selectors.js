import { createSelector } from 'reselect';
import selectNavigationContainer from '../NavigationContainer/selectors';

/**
 * Direct selector to the linkListContainer state domain
 */
const selectLinkListContainerDomain = () => state => state.get('linkListContainer');

/**
 * Other specific selectors
 */

const selectRouteTopic = () => (state, props) =>
  props.params.topicName;

const selectTopic = () => createSelector(
  selectNavigationContainer(),
  selectRouteTopic(),
  (navigationState, routeTopicName) => {
    const selectedTopic = navigationState.topics.find(t => t.name === routeTopicName);

    // natahneme si ze state vsechny topic a pokud novy routeTopicName neni v kolekci, tak presmerujeme na ''
    return selectedTopic || {
      name: '',
    };
  }
);

/**
 * Default selector used by LinkListContainer
 */

const selectLinkListContainer = () => createSelector(
  selectLinkListContainerDomain(),
  selectTopic(),
  (substate, topic) =>
    Object.assign(substate.toJS(), { topicName: topic.name })
);

export default selectLinkListContainer;
export {
  selectLinkListContainerDomain,
};
