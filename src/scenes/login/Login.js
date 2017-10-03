import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native'

const Sound = require('react-native-sound')
import Database from '../../database/database'
import Button from '../../components/Button/Button'
import InputText from '../../components/InputText/InputText'

export default class Login extends Component {
  constructor(props) {
    super(props)
    Sound.setCategory('Playback');

    this.navigate = this.navigate.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  navigate(id) {
    this.props.navigator.push({ id });
  }

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  validatePassword(password) {
    if (password.length > 8) { return true }
    else { return false }
  }

  handleFormSubmit() {
    try {
      if (this.state.email == 'cuatroBabys@malumita.com') {
        const cuatro = new Sound('cuatrobabys.mp3', Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            console.error('Error en el easteregg: ', error);
            return;
          }
          cuatro.play();
          cuatro.setVolume(1);
        });
      } else {
        if (this.validateEmail(this.state.email)) {
          Database.loginUser(this.state.email, this.state.password).then(res => {
            if (res) this.navigate('Home');
          });
        }
        else {
          alert('Malformed email');
        }
      }
    }
    catch (error) {
      console.error('Error: ', error);
    }
  }

  render() {
    return (
      <View style={styles.formContainer}>
        <Image
          source={require('../../resources/logo.png')}
          style={styles.imagen}
        />
        <InputText
          onchange={(email) => this.setState({ email })}
          type='default'
          placeholder='EMAIL'
          secure={false}
        />
        <InputText
          onchange={(password) => this.setState({ password })}
          type='default'
          placeholder='PASSWORD'
          secure={true}
        />
        <Button onpress={() => this.handleFormSubmit()} text='LOGIN' />
        <Button onpress={() => this.navigate('Register')} text='REGISTER' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imagen: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 50
  },
  formContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 40,
    backgroundColor: '#fff'
  }
})
