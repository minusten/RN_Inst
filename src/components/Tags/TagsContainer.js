import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTag, deleteTag } from '../../redux/actions/actions';
import Tags from './Tags';

const mapStateToProps = state => {
  console.log('state');
  return {
    tags: state.tags
  };
};
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ addTag, deleteTag }, dispatch)
  };
};

const TagsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tags);

export default TagsContainer;
