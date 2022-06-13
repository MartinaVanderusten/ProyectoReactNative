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

            <Text>Home</Text>

          {/* <FlatList 
            data={this.state.posteos}
            keyExtractor={item => item.id.toString()}
<<<<<<< HEAD
            renderItem={({ item }) => <Posts info={item}/>}
          
          />*/} 
=======
            renderItem={({ item }) => <Posts info={item}/>} 
          />  */}
>>>>>>> 483ae372c21ec9c917d30e412edfa43fc21e20c5
              
          </View>
        )
      }
    }


export default Home;