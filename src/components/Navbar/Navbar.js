import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Navbar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <View style={styles.navContainer}>
        <View style={[styles.buttonContainer, {marginLeft: 3}]}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={this.props.onpressnav}
          >
            <Icon name={((this.props.type == 'Home') ? 'menu' : 'arrow-back')} size={32} color='#FFF'/>
          </TouchableOpacity>
        </View>
        <View style={[styles.buttonContainer, {marginRight: 5}]}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={this.props.onpressearch}
          >
            <Icon name={((this.props.type == 'Home') ? 'search' : 'more-vert')} size={32} color='#FFF'/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F44336',
    height: 50
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40
  },
  button: {
    height: 35,
    width: 35
  }
})
