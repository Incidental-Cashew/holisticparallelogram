import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import ReactDOM from 'react-dom';
import $ from 'jquery';
import _ from 'underscore';
import searchGooglePlaces from '../utils/searchGooglePlaces.js';
import actions from '../actions/index.js';


class Navbar extends Component {

  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  handleScroll() {
    if (window.scrollY > 300) {
      $('div .navbar').addClass('showNav').attr('style', "display: ''");
    } else {
      $('div .navbar').attr('style', 'display: none');
    }
  }

  render() {

    var logInOut;
    if (_.isEmpty(this.props.user)) {
      logInOut = <a className='link' href='/'>Login</a>;
    } else {
      logInOut = <a className='link' href='/auth/logout'>Logout</a>;
    }


    return (

      <div className="navbar" style={{display: 'none'}}>
        <a href='#'>
        <img className='navSamurai' src='./../assets/samurai_lg.png' />
        </a>
        <p className='navLogInOut'>{logInOut}</p>
      </div>

    )

  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

Navbar.propTypes = {
  user: PropTypes.object
};



export default connect(
  mapStateToProps
)(Navbar);