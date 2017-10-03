import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native'
import StarRating from 'react-native-star-rating'

import Navbar from './../../components/Navbar/Navbar'
import Database from '../../database/database'

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      starCount: 3.5
    };

    this.navigate = this.navigate.bind(this);
  }

  navigate(id) {
    this.props.navigator.push({ id });
  }

  componentWillMount() {
    this.setState({
      user: Database.getUser()
    })
  }

  render() {
    return (
      <View style={styles.fromContainer}>
        <Navbar
          onpressnav={() => _navigator.pop()}
          onpressearch={() => this.navigate('UpdateProfile')}
          type=''
        />
        <View style={styles.backPhoto}>
          <Image
            source={{ uri: this.state.user.photoURL }}
            style={styles.image}
          />
        </View>
        <View style={styles.nys}>
          <View>
            <Text style={styles.name}>
              {this.state.user.displayName}
            </Text>
            <Text style={styles.email}>
              {this.state.user.email}
            </Text>
          </View>
          <StarRating
            disabled={true}
            maxStars={5}
            rating={this.state.starCount}
            starColor={'#D32F2F'}
            emptyStarColor={'#f2828a'}
            starSize={30}
          />
        </View>

      </View>

    )
  }
}

const styles = StyleSheet.create({
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },

  nys: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  backPhoto: {
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#DDDDDD'
  },
  name: {
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: '800'
  },

  email: {
    fontSize: 15
  },

  image: {
    height: 200,
    width: 200,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#fff'
  }
})
