import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeStateProp } from '../actions';
import { addPlace, addTag, deleteTag } from '../../Root/actions/place';
import AddImage from './AddImage';

const mapStateToProps = state => {
  console.log('state', state);
  return {
    places: state.places,
    tags: state.tags
  };
};
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(
      { changeStateProp, addPlace, addTag, deleteTag },
      dispatch
    ),
    myCustomPropsFunc: function(prop, value, reducer) {
      changeStateProp(prop, value, reducer)(dispatch);
      return null;
    }
  };
};

const AddImageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddImage);

export default AddImageContainer;
