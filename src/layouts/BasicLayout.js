import React from 'react';
import PropTypes from 'prop-types';

class BasicLayout extends React.Component {
  static get propTypes() {
    return {
      match: PropTypes.any,
      dispatch: PropTypes.any
    };
  }
  render() {
    return (
      <div className='primary-layout' style={{ display: 'flex', justifyContent: 'center'}}>
        <header>header</header>
        <div>container</div>
        <header>footer</header>
      </div>
    );
  }
}

export default BasicLayout;