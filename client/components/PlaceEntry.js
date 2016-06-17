import React, {Component} from 'react';
import { connect } from 'react-redux';

class PlaceEntry extends Component {
  constructor(props) {
    super(props);
    this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault;
    this.props.onSaveClick(this.props.place, this.props.user);
  }

  render() {
    return (
      <div className='place-entry animated fadeInUp'>
        <div className='place-entry-favorite'>
          <span onClick={this.handleClick.bind(this)} className='icon-heart' aria-hidden='true'></span>
        </div>
        <div className='place-info' >
            <h4>{ this.props.place.name }</h4>
            <p>{ this.props.place.address }</p>
            <div className='place-pic'>
              <a href={'https://www.google.com/maps/place/' + this.props.place.name + ' ' + this.props.place.address} target="_blank">
                <img src={ this.props.place.image } />
              </a>
            </div>
            <div>
              <a className='place-entry-link' href={'//www.images.google.com/search?q=' + this.props.place.name + ' ' + this.props.place.address + '&tbm=isch'}
              target='_blank'>View Images</a>
              <span className='place-entry-link-divider'>&middot;</span>
              <a className='place-entry-link' href={'//www.google.com/search?q=' + this.props.place.name + ' ' + this.props.place.address}
              target='_blank'>Find on Google</a>
            </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {user: state.user};
};

export default connect(mapStateToProps)(PlaceEntry);
