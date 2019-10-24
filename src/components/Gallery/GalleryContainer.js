import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Gallery from './Gallery';
import { deleteImg } from '../../redux/actions/actions';
import { deleteTag } from '../../redux/actions/actions';

const mapStateToProps = state => {
  return {
    images: state.images,
    tags: state.tags,
    coords: state.coords
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ deleteImg, deleteTag }, dispatch)
    // myCustomPropsFunc: function(prop, value, reducer) {
    //   changeStateProp(prop, value, reducer)(dispatch);
    //   return null;
    // }
  };
};

const GalleryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Gallery);

export default GalleryContainer;
