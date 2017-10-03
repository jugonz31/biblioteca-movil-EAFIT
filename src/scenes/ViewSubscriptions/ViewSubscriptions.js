import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'
import Database from './../../database/database'

import Subscriptor from './../../components/Subscriptor/Subscriptor'
import Navbar from './../../components/Navbar/Navbar'

export default class PostView extends Component {
  constructor(props) {
    super(props)

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit() {
    var user = Database.getUser();
  }

  componentWillMount() {
    if (this.props.data.subscribedUsers != undefined) {
      this.setState({
        subs: this.props.data.subscribedUsers
      });
    } else {
      this.setState({
        subs: {}
      });
    }
  }

  formatData() {
    let subData = [];
    for (var i in this.state.subs) {
      subData.push({
        key: i,
        data: this.state.subs[i]
      })
    }
    return subData;
  }

  render() {
    const subs = this.formatData();

    const subsComponents = subs.map(data => {
      return (
        <Subscriptor
          key={data.key}
          info={{ ...data.data }}
        />
      )
    });

    return (
      <View style={styles.container}>
        <Navbar
          onpressnav={() => _navigator.pop()}
          type=''
        />
        <ScrollView style={styles.postsList}>
          {subsComponents}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  postsList: {
    padding: 5,
    backgroundColor: '#DDDDDD'
  }
})
