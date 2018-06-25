/**
*
* Navigation
*
*/

import React from 'react';


import styles from './styles.css';
import AppBar from '../AppBar';
import Drawer from '../Drawer';

function Navigation({ topics, selectTopic, toggleDrawer, isDrawerOpen, email }) {
  return (
    <div className={styles.navigation}>
      <AppBar
        toggleDrawer={toggleDrawer}
        email={email}
      />
      <Drawer
        items={topics}
        selectItem={selectTopic}
        itemLabelAttr="name"
        itemKeyAttr="name"
        isDrawerOpen={isDrawerOpen}
      />
    </div>
  );
}

Navigation.propTypes = {
  email: React.PropTypes.string,
  isDrawerOpen: React.PropTypes.bool.isRequired,
  toggleDrawer: React.PropTypes.func.isRequired,
  topics: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      description: React.PropTypes.string.isRequired,
    })
  ).isRequired,
  selectTopic: React.PropTypes.func.isRequired,
};

export default Navigation;
