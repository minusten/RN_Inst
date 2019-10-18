import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeStateProp } from '../actions';
import Gallery from './ Gallery';
import { deleteImg } from '../../Root/actions/place';
import { deleteTag } from '../../Root/actions/place';

const mapStateToProps = state => {
  console.log('state', state);
  return {
    places: state.places,
    tags: state.tags
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ changeStateProp, deleteImg, deleteTag }, dispatch),
    myCustomPropsFunc: function(prop, value, reducer) {
      changeStateProp(prop, value, reducer)(dispatch);
      return null;
    }
  };
};

const GalleryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Gallery);

export default GalleryContainer;
