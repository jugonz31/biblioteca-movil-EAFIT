import React, { Component } from 'react'
import {
  TextInput,
  KeyboardAvoidingView,
  StyleSheet
} from 'react-native'

export default class InputText extends Component {
  constructor( props ) {
    super( props )
  }

  render() {
    return(
      <KeyboardAvoidingView behavior='padding'>
            <TextInput
              keyboardType={this.props.type}
              autoCorrect={false}
              placeholder={this.props.placeholder}
              placeholderTextColor="rgba(117, 117, 117, 0.8)"
              selectionColor="#FFE082"
              underlineColorAndroid="#FF5722"
              secureTextEntry={this.props.secure}
              style={styles.inputStyle}
              onChangeText={this.props.onchange}
            />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  inputStyle: {
    height: 40,
    color: "#212121",
    backgroundColor: '#FFF',
    marginBottom: 10
  }
})
