import expect from 'expect';
import linkFormContainerReducer from '../reducer';
import { fromJS } from 'immutable';

describe('linkFormContainerReducer', () => {
  it('returns the initial state', () => {
    expect(linkFormContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
