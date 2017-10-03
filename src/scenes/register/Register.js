import React, { Component } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import Database from '../../database/database'

import InputText from '../../components/InputText/InputText'
import Button from '../../components/Button/Button'

export default class Register extends Component {
  constructor(props) {
    super(props)

    this.navigate = this.navigate.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  navigate(id) {
    this.props.navigator.push({ id });
  }

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  validatePassword(password) {
    if (password.length > 7) { return true }
    else { return false }
  }

  handleFormSubmit() {
    try {
      if (this.validateEmail(this.state.email)) {
        if (this.validatePassword(this.state.password)) {
          Database.createUser(
            this.state.firstname,
            this.state.lastname,
            this.state.email,
            this.state.password
          );
          this.navigate('Login');
        }
        else {
          alert('La contraseña debe tener minimo 8 caracteres')
        }
      }
      else {
        alert('Malformed email');
      }
    } catch (error) {
      console.log('Error creando usuario: ', error);
    }
  }

  render() {
    return (
      <View style={styles.formContainer}>
        <InputText
          onchange={(firstname) => this.setState({ firstname })}
          type='default'
          placeholder='FIRSTNAME'
          secure={false}
        />
        <InputText
          onchange={(lastname) => this.setState({ lastname })}
          type='default'
          placeholder='LASTNAME'
          secure={false}
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
        <Button onpress={() => this.handleFormSubmit()} text='REGISTER' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#fff'
  }
})
