/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  TextInput,
  StyleSheet,
  PanResponder,
  Animated,
  View
} from 'react-native';
import { addTag, deleteTag } from '../../redux/actions/actions';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

class Tags extends Component {
  constructor(props) {
    super(props);
    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        position.setOffset(position.__getValue());
        position.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      }
    });

    this.state = {
      panResponder,
      position,
      text: '',
      tags: [],
      locationX: 0,
      locationY: 0
    };
  }
  setTags = evt => {
    this.setState({
      locationX: evt.nativeEvent.locationX,
      locationY: evt.nativeEvent.locationY
    });
    if (this.state.tags) {
      let tagsArr = this.state.tags;
      tagsArr.push(this.state.text);
      this.props.addTag(tagsArr);
      console.log('tags', this.props.tags);
      this.setState({
        text: ''
      });
    } else {
      console.log('Tags not added');
    }
  };
  render() {
    let handles = this.state.panResponder.panHandlers;
    return (
      <Animated.View
        style={[styles.input, this.state.position.getLayout()]}
        {...handles}>
        <View
          style={{
            position: 'absolute',
            left: this.state.locationX,
            top: this.state.locationY
          }}>
          <Icon name="plus" size={20} color="black" onPress={this.setTags} />
          <TextInput
            value={this.state.text}
            onChangeText={text => this.setState({ text })}
          />
        </View>
      </Animated.View>
    );
  }
}
const styles = StyleSheet.create({
  ball: {
    height: 80,
    width: 80,
    borderColor: 'black',
    borderRadius: 40,
    borderWidth: 40
  },
  input: {
    backgroundColor: 'grey',
    borderRadius: 5,
    borderColor: 'black',
    height: 50,
    width: 150,
    // marginRight: 250,
    display: 'flex',
    justifyContent: 'center'
  }
});

const mapStateToProps = state => {
  return {
    tags: state.tags
  };
};

const mapDispatchToProps = dispatch => {
  return {
    tag: name => {
      dispatch(addTag(name));
    },
    deletetag: tag => {
      dispatch(deleteTag(tag));
    }
  };
};

export default connect(
  mapDispatchToProps,
  mapStateToProps
)(Tags);
