import expect from 'expect';
import loginContainerReducer from '../reducer';
import { fromJS } from 'immutable';

describe('loginContainerReducer', () => {
  it('returns the initial state', () => {
    expect(loginContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
