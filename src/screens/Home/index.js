import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image, FlatList} from 'react-native';
import {db} from '../../firebase/config'

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
          posteos: []
        }
      }

componentDidMount(){
  db.collection('posts').onSnapshot(
    docs=> {
      let posteos = []
        docs.forEach(
          doc => {
            posteos.push({
              id:doc.id,
              data: doc.data()
            })
          }
        )
        this.setState({
          posteos:posteos,
          
        }, ()=> console.log(this.state.posteos))
    }
  )
}

      render(){
        return (
          <View>
          <FlatList 
            data={this.state.posteos}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <Message info={item}/>}
          
          />
              
          </View>
        )
      }
    }


export default Home;