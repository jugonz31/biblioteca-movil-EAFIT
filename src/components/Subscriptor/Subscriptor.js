import React, { Component } from 'react'
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import StarRating from 'react-native-star-rating'

export default class Post extends Component {
  constructor(props) {
    super(props)

    this.state = {
      starCount: 3.5
    }

    this.navigate = this.navigate.bind(this);
  }

  navigate({ id, data }) {
    this.props.navigator.push({ id, data })
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.usernameText}>{this.props.info.userName}</Text>
        <Text style={styles.emailText}>{this.props.info.email}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#BDBDBD',
    backgroundColor: '#FFFFFF'
  },
  imageContainer: {
    backgroundColor: '#CDCDCD',
    padding: 1,
    alignItems: 'center',
    borderRadius: 5,
  },
  postImage: {
    height: 200,
    width: 250,
  },
  infoContainer: {
    padding: 5,
  },
  principalInfoContainer: {
    padding: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  usernameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  emailText: {
    fontSize: 14,
    fontStyle: 'italic'
  },
  rateContainer:{
    alignSelf: 'center'
  },
  foodInfoContainer: {
    padding: 5
  },
  foodDescription: {
    fontSize: 15,
    fontWeight: 'normal'
  },
  button: {
    backgroundColor: '#F44336',
    height: 40,
    justifyContent: 'center',
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 10
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '600'
  }
})
