import { View, StyleSheet, TextInput } from 'react-native'
import React, {Component} from 'react'
import { db } from '../../firebase/config'


class Search extends Component {
    constructor(props){
      super(props)
      this.state = {
        email:"",
      }
    }

    userSearch(text){
        //Setear búsqueda ¿hace falta?
        this.setState({
            email:text
        })
        //Comprueba que haya una búsqueda para empezar a buscar resultados
        if (text.lengt > 0) {
            db.collection('post')            
        }
    }

    render(){
      return (
        <View style={styles.container}>
            <TextInput style={styles.textInput}
                keyboardType='email-address'
                placeholder='e-mail del usuario'
                onChangeText={ text => userSearch(text) }
            />
        </View>
      )
    }
  }
  
export default Search

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#e76f51'
  },
  textInput:{
    height:20,
    width:'40%',
  }
}) 