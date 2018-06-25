/*
 *
 * LinkFormContainer
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectLinkFormContainer from './selectors';
import LinkForm from '../../components/LinkForm';
import { addLink, addLinkCancelled } from './actions';

export class LinkFormContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <LinkForm {...this.props} />
    );
  }
}

const mapStateToProps = selectLinkFormContainer();

function mapDispatchToProps(dispatch) {
  return {
    addLink: (link) => dispatch(addLink(link)),
    addLinkCancelled: () => dispatch(addLinkCancelled()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkFormContainer);
