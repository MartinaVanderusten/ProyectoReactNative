import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image, FlatList, ActivityIndicator} from 'react-native';
import {db} from '../../firebase/config'
import Post from '../../components/Post'


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
          <View style={styles.container}>

            <Text>Home</Text>

           <FlatList style={styles.posts}
            data={this.state.posteos}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <Post info={item}/>}
          
          />
           {/* <ActivityIndicator size='large' color='blue' /> */}

          </View>
        )
      }
    }

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: 10,
    paddingLeft: 500, 
  }
})
export default Home;