import { View, StyleSheet } from 'react-native'
import React, {Component} from 'react'


class NewPost extends Component {
    constructor(props){
      super(props)
      this.state = {
      }
    }
    render(){
      return (
        <View style={styles.container}> 
        </View>
      )
    }
  }
  
export default NewPost

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#e76f51'
  },
}) 

