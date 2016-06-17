import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import ReactDOM from 'react-dom';
import $ from 'jquery';
import _ from 'underscore';
import searchGooglePlaces from '../utils/searchGooglePlaces.js';
import actions from '../actions/index.js';

class Header extends Component {

  handleClick(e) {
    e.preventDefault();
    this.props.onFindClick();
  }

  render() {

    // Set the login and logout depending on whether the user is logged in.
    var logInOut;
    if (_.isEmpty(this.props.user)) {
      logInOut = <a className='link' href='/'>Login</a>;
    } else {
      logInOut = <a className='link' href='/auth/logout'>Logout</a>;
    }

    return (
      <header>
        <nav className='col-12-12'>
          <ul>
            <li>{logInOut}</li>
          </ul>
        </nav>
        <div className='grid'>
          <div className='col-2-12'>
            <img className='samurai' src='./../assets/samurai_lg.png' />
          </div>
          <div className='col-10-12'>
            <h1>SCENIC<span className='black'>.SAMURAI</span></h1>
            <p className='description'>After years spent scouring Google Places, Scenic Samurai is ready to share his wisdom with you.</p>
            <button
            onClick={ this.handleClick.bind(this) }
            type="submit">Find Views
            </button>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFindClick: () => {
      // Append the body with loading spinner and text
      var ele = '<div id="spinner">Samurais are scouting for your views...</div>';
      var gif = '<img id="spin-gif" src="../assets/poi.gif">';
      $('#loading-container').prepend(ele);
      $('#loading-container').prepend(gif);
      searchGooglePlaces(function(data) {
        // Remove loading spinner and text now that places have been returned
        $('#spinner').fadeOut();
        $('#spin-gif').fadeOut();
        dispatch(actions.updatePlaces(data.places));
      });
    }
  };
};

Header.propTypes = {
  user: PropTypes.object,
  onFindClick: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
