import React, { Component } from 'react'
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import StarRating from 'react-native-star-rating'

import Database from './../../database/database'

export default class Post extends Component {
  constructor(props) {
    super(props)

    this.state = {
      starCount: 0
    }

    this.navigate = this.navigate.bind(this);
  }

  navigate({ id, data }) {
    this.props.navigator.push({ id, data })
  }

  componentWillMount() {
    this.getRate().then((data) => {
      this.setState({
        starCount: parseInt(data.rate)
      })
    })
  }

  async getRate() {
    var rate = await Database.getUserRate(this.props.info.uid);
    return rate;
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.postContainer}
        activeOpacity={0.8}
        onPress={() => this.navigate({
          id: 'ViewSubscriptions',
          data: this.props.info
        })}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: this.props.info.picture }}
            style={styles.postImage}
          />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.principalInfoContainer}>
            <View>
              <Text style={styles.foodNameText}>{this.props.info.title}</Text>
              <Text style={styles.usernameText}>{this.props.info.authorName}</Text>
            </View>
            <View style={styles.rateContainer}>
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
          <View style={styles.foodInfoContainer}>
            <Text style={styles.foodDescription}>
              {this.props.info.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  postContainer: {
    padding: 5,
    margin: 5,
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
  foodNameText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  usernameText: {
    fontSize: 14,
    fontStyle: 'italic'
  },
  rateContainer: {
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
