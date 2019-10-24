import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  addImages,
  addTag,
  deleteTag,
  addPosition
} from '../../redux/actions/actions';
import ImageComponent from './ImageComponent';

const mapStateToProps = state => {
  return {
    images: state.images,
    tags: state.tags,
    coords: state.coords
  };
};
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(
      { addImages, addTag, deleteTag, addPosition },
      dispatch
    )
  };
};

const ImageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageComponent);

export default ImageContainer;
