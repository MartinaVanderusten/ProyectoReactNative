import { View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import React, {Component} from 'react'

class Register extends Component {
    constructor(props){
      super(props)
      this.state = {
        username:"",
        email:"",
        password:"",
      }
    }

    send(){
      console.log(this.state.username)
      console.log(this.state.email)
      console.log(this.state.password)
      if ((this.state.username.length > 0)&&(this.state.email.length > 0)&&(this.state.password.length > 0)) {
        return(this.props.signUp(this.state.username,this.state.email,this.state.password))
      }
    }

    render(){
      return (
        <View style={styles.body}>
          <View style={styles.conteiner}>
            <Text>Register</Text>
            <TextInput style={styles.textInput}
              keyboardType='default'
              placeholder='username'
              onChangeText={ text => this.setState({username:text})}
            />
            <TextInput style={styles.textInput}
              keyboardType='email-address'
              placeholder='e-mail'
              onChangeText={ text => this.setState({email:text})}
            />
            <TextInput style={styles.textInput}
              keyboardType='default'
              placeholder='password'
              secureTextEntry={true}
              onChangeText={ text => this.setState({password:text})}
            />
            { this.props.error ?
              <React.Fragment>
                <Text>{this.props.error}</Text>
                <TouchableOpacity onPress={()=>this.props.errorDelete()}>
                  <Text>Okey</Text>
                </TouchableOpacity>
              </React.Fragment>
              :
              <TouchableOpacity onPress={() =>this.send()}>
                <Text>Send</Text>
              </TouchableOpacity>
            }
            <View>
              <Text>¿Ya tenés tu cuenta?</Text>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')}>
                <Text>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    }
  }
  
export default Register

const styles = StyleSheet.create({
  body:{
    flex:1,
    alignItems:'center',
    alignContent:'center',
    justifyContent:'center',
    backgroundColor:'#264653',
  },
  conteiner:{
    alignItems:'center',
    alignContent:'center',
    justifyContent:'center',
    backgroundColor:'#ffffff',
    width:'40%',
    aspectRatio:1/1,
    borderRadius:15,
    borderWidth:5,
    borderColor:'#2a9d8f'
  },
  textInput:{
    height:20,
    width:'40%',
  }
})