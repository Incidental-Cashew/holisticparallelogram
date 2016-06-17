import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import SavedPlaceEntry from './SavedPlaceEntry.js';
import ReactDOM from 'react-dom';
import actions from '../actions/index.js';
import $ from 'jquery';

import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
import IconButton from 'material-ui/lib/icon-button';
import GoogleMap from 'google-map-react';
import TestMarker from './TestMarker.js';

const mapstyles = {width:580, height: 600, float:'left', marginLeft:100};
const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    float:'left',
    marginTop: 20
  },
  gridList: {
    width:700,
    height: 600,
    marginBottom: 24,
    overflowY: 'auto'

  },
};
 var center;


class SavedPlaceContainer extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    if (this.props.savedPlaces.length === 0) {

      // there are no saved places, so show an empty state
      return (
        <div >
        <h3>Your Saved Places</h3>
          <div >
            <p>
              If you like a place, click the &hearts; to save it for later.
            </p>
          </div>
        </div>
      );
    } else {
      // there are saved places, so display them
      return (
        <div>
          <div style={styles.root}>
          <GridList
           cellHeight={120}
           style={styles.gridList}
           padding={25}

          >

          { this.props.savedPlaces.map((savedPlace, i) => (
            <div>
              <SavedPlaceEntry savedPlace={savedPlace} onDeleteClick={this.props.onDeleteClick} key={i}/>
            </div>
          ))}

        </GridList>
        </div>
        <div style={mapstyles}>
        <GoogleMap
          bootstrapURLKeys={{
              key: 'AIzaSyAeYPE2KvoYwdSiVVrZEwdyQ94engLcfxY',
              language: 'en'
          }}
          center={[this.props.savedPlaces[0].lat, this.props.savedPlaces[0].lng]}
          zoom={10}
          >
          {this.props.savedPlaces.map((savedPlace, i) =>(
            <TestMarker lat={savedPlace.lat} lng={savedPlace.lng} text={'A'} key={i}></TestMarker>
          ))}

        </GoogleMap>
        </div>
      </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    savedPlaces: state.savedPlaces
  };
};

SavedPlaceContainer.propTypes = {
  savedPlaces: PropTypes.array,
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteClick: (place, user) => {
      $.ajax({
        url: '/api/places/saved',
        method: 'DELETE',
        data: {user: user, place: place},
      });
      dispatch(actions.deletePlace(place));
    }
  };
};


SavedPlaceContainer.propTypes = {
  savedPlaces: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SavedPlaceContainer);
