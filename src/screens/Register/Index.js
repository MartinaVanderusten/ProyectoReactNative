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
      if ((this.state.username.length > 0)&&(this.state.email.length > 0)&&(this.state.password.length > 0)) {
        return(this.props.signUp(this.state.username,this.state.email,this.state.password))
      }
    }

    render(){
      return (
        <View style={styles.body}>
          <View style={styles.container}>
            <Text style={styles.textTitle}>Register</Text>
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
                <Text style={styles.textError}>{this.props.error}</Text>
                <TouchableOpacity style={styles.okey} onPress={()=>this.props.errorDelete()}>
                  <Text style={styles.text}>Okey</Text>
                </TouchableOpacity>
              </React.Fragment>
              :
              <TouchableOpacity style={styles.send} onPress={() =>this.send()}>
                <Text style={styles.text}>Send</Text>
              </TouchableOpacity>
            }
            <View style={styles.navigate}>
              <Text style={styles.text}>¿Ya tenés tu cuenta?</Text>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')}>
                <Text style={styles.textNav}>Login</Text>
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
  container:{
    alignItems:'center',
    alignContent:'center',
    justifyContent:'center',
    backgroundColor:'#ffffff',
    minWidth:265,
    width:'50%',
    aspectRatio:1/1,
    maxHeight:'80%',
    minHeight:'fit-content',
    padding:20,
    borderRadius:20,
    borderWidth:5,
    borderColor:'#2a9d8f'
  },
  textInput:{
    height:20,
    width:'64%',
    marginBottom:10,
    paddingVertical:12,
    paddingHorizontal:5,
    backgroundColor:'#264653',
    borderRadius:5,
    borderWidth:2,
    borderColor:'#2a9d8f',
    color:'white'
  },
  text:{
    textAlign:'center',
    
  },
  textNav:{
    textAlign:'center',
    textDecorationLine:'underline',
  },
  textTitle:{
    textAlign:'center',
    marginBottom:10,
    fontSize:24,
    marginBottom:20,
    
  },
  textError:{
    textAlign:'center',
    fontWeight:'bold',
    backgroundColor:'rgba(97, 0, 0, 0.8)',
    color:'#b3b3b3',
    padding:5,
    borderRadius:3,
  },
  navigate:{
    marginTop:15,
  },
  send:{
    backgroundColor:'#2a9d8f',
    width:'32%',
    padding:5,
    borderRadius:5,
    
  },
  okey:{
    backgroundColor:'#2a9d8f',
    width:'32%',
    padding:5,
    borderRadius:5,
    marginTop:5,
  },
})