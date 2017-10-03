import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import Drawer from 'react-native-drawer'

const data = [
  {
    key: 'Home',
    text: 'Home'
  },
  {
    key: 'Profile',
    text: 'Profile'
  },
  {
    key: 'UserPost',
    text: 'My posts'
  },
  {
    key: 'Orders',
    text: 'My orders'
  },
  {
    key: 'Recommendations',
    text: 'Recommendations'
  }
]

export default class Sidebar extends Component {
  constructor(props) {
    super(props)
  }

  navigate(id) {
    this.props.navigator.push({ id });
  }

  render() {
    const buttons = data.map(data => {
      return (
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={() => this.navigate(data.key)}
          key={data.key}
        >
          <Text style={styles.buttonText}>{data.text}</Text>
        </TouchableOpacity>
      )
    })
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../resources/logo.png')}
            resizeMode='cover'
          />
        </View>
        <View style={styles.buttonContainer}>
          {buttons}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    borderRightWidth: 1,
    borderRightColor: '#BDBDBD',
    backgroundColor: '#fff'
  },
  imageContainer: {
    alignSelf: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#BDBDBD'
  },
  buttonContainer: {
    justifyContent: 'flex-start',
    padding: 30,
  },
  button: {
    padding: 5,
  },
  buttonText: {
    textAlign: 'left',
    fontSize: 20,
    color: '#212121',
    fontWeight: '200'
  }
})
