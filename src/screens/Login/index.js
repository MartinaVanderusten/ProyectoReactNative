import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import React, {Component} from 'react'

class Login extends Component {
    constructor(props){
      super(props)
      this.state = {
      }
    }
    render(){
      return (
        <View style={styles.body}>
          <View style={styles.conteiner}>
            <Text>Login</Text>
            <View>
              <Text>¿Todavía no tenés tu cuenta?</Text>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate('Register')}>
                <Text>Registrate</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    }
  }
  
export default Login

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
  }
})