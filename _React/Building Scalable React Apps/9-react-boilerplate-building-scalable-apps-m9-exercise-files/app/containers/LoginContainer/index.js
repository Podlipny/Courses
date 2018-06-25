/*
 *
 * LoginContainer
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectLoginContainer from './selectors';
import Login from '../../components/Login';
import { login, cancelLogin } from './actions';

export class LoginContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Login {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = selectLoginContainer();

function mapDispatchToProps(dispatch) {
  return {
    login: (email) => dispatch(login(email)),
    cancelLogin: () => dispatch(cancelLogin()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
