import { View, FlatList } from 'react-native'
import React, {Component} from 'react'
import {db} from '../../firebase/config'


class Profile extends Component {
    constructor(props){
      super(props)
      this.state = {
        
      }
    }
    render(){
      return (
        <View style={styles.flatlist}>
          <FlatList 
            data={}
            keyExtractor={}
            renderItem={}
          
          />
        </View>
      )
    }
  }
  
export default Profile