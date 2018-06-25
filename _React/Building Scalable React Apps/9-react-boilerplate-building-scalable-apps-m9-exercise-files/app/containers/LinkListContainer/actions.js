/*
 *
 * LinkListContainer actions
 *
 */

import {
  REQUEST_LINKS_SUCCEEDED,
  REQUEST_LINKS_FAILED,
  REQUEST_LINKS,
  START_ADD,
} from './constants';

export function startAdd(topicName) {
  return {
    type: START_ADD,
    topicName,
  };
}

export function requestLinks(topicName) {
  return {
    type: REQUEST_LINKS,
    topicName,
  };
}

export function requestLinksSucceeded(links) {
  return {
    type: REQUEST_LINKS_SUCCEEDED,
    links,
  };
}

export function requestLinksFailed(message) {
  return {
    type: REQUEST_LINKS_FAILED,
    message,
  };
}
