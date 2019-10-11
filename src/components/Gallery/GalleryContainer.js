import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeStateProp } from '../actions'
import Gallery from './ Gallery'

const mapStateToProps = (state) => {
  console.log('state', state)
  return {
    places: state.places
  }
 
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({ changeStateProp }, dispatch),
    myCustomPropsFunc: function (prop, value, reducer) {
      changeStateProp(prop, value, reducer)(dispatch)
      return null
    }
  }
}

const GalleryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Gallery)

export default GalleryContainer