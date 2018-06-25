/*
 *
 * LinkListContainer
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectLinkListContainer from './selectors';
import LinkList from '../../components/LinkList';
import { requestLinks, startAdd } from './actions';

export class LinkListContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    topicName: React.PropTypes.string.isRequired,
    requestLinks: React.PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.requestLinks(this.props.topicName);
  }

  // pokud zmenime Topic, takm se komponenta prerenderuje, ale mi chceme take
  // link pro dany topic
  componentWillReceiveProps(newProps) {
    if (newProps.topicName !== this.props.topicName) {
      this.props.requestLinks(newProps.topicName);
    }
  }

  render() {
    return (
      <LinkList {...this.props} />
    );
  }
}

const mapStateToProps = selectLinkListContainer();

function mapDispatchToProps(dispatch) {
  return {
    requestLinks: (topicName) => dispatch(requestLinks(topicName)),
    startAdd: (topicName) => dispatch(startAdd(topicName)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkListContainer);
