import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addImages, addTag, deleteTag } from '../../redux/actions/actions';
import AddImage from './AddImage';

const mapStateToProps = state => {
  return {
    imges: state.images,
    tags: state.tags
  };
};
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ addImages, addTag, deleteTag }, dispatch)
    // myCustomPropsFunc: function(prop, value, reducer) {
    //   changeStateProp(prop, value, reducer)(dispatch);
    //   return null;
    // }
  };
};

const AddImageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddImage);

export default AddImageContainer;
