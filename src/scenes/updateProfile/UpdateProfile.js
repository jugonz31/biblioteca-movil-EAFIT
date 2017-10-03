import React, { Component } from 'react'
import {
  AppRegistry,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput
} from 'react-native'
import ActionButton from 'react-native-action-button'

import Database from '../../database/database'
import Button from '../../components/Button/Button'
import InputText from '../../components/InputText/InputText'
import ImagePicker from 'react-native-image-crop-picker'

import Navbar from './../../components/Navbar/Navbar'


export default class UpdateProfile extends Component {
  constructor(props) {
    super(props);

    this.navigate = this.navigate.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillMount() {
    var { displayName, email, photoURL } = Database.getUser();
    this.setState({
      displayName,
      email,
      photoURL
    })
  }

  navigate(id) {
    this.props.navigator.push({ id });
  }

  handleFormSubmit() {
    try {
      Database.updateProfileFireBase(
        this.state.displayName,
        this.state.email,
        this.state.photoURL
      );
      _navigator.pop();

    } catch (error) {
      console.error('Error: ', error);
    }
  }

  openImage() {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true
    }).then(image => {
      this.setState({ photoURL: image.path });
    }).catch(function (e) {
      console.log('El usuario no eligio foto ', e)
    });
  }

  render() {
    return (
      <View style={styles.createContainer}>
        <Navbar
          onpressnav={() => { _navigator.pop() }}
          type=''
        />
        <KeyboardAvoidingView
          behavior='position'
          style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: this.state.photoURL }}
            />
            <ActionButton
              buttonColor='rgba(255, 87, 34, 1)'
              onPress={() => this.openImage()}
              offsetX={75}
              offsetY={0}
            />
          </View>
          <View
            style={styles.formContainer}>
            <InputText
              onchange={(displayName) => this.setState({ displayName })}
              type='default'
              placeholder={this.state.displayName}
              secure={false}
            />
            <InputText
              onchange={(email) => this.setState({ email })}
              type='default'
              placeholder={this.state.email}
              secure={false}
            />
          </View>
        </KeyboardAvoidingView>
        <Button onpress={() => this.handleFormSubmit()} text='UPDATE' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  createContainer: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  container: {
    flex: 1,
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#fff',
    padding: 30
  },
  imageContainer: {
    backgroundColor: '#CDCDCD'
  },
  image: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    padding: 10,
  },
  addButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45,
  },
  addButton: {
    backgroundColor: '#FF5722',
    borderRadius: 25,
  }
})
