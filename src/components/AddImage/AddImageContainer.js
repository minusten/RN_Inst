import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeStateProp } from '../actions'
import { addPlace } from '../../Root/actions/place'
import AddImage from './AddImage'

const mapStateToProps = (state) => {
  console.log('state', state)
  return {
    places: state.places
  }
 
}
const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({ changeStateProp, addPlace }, dispatch),
    myCustomPropsFunc: function (prop, value, reducer) {
      changeStateProp(prop, value, reducer)(dispatch)
      return null
    }
  }
}

const AddImageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddImage)

export default AddImageContainer