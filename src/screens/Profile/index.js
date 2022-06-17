import { View, FlatList } from 'react-native'
import React, {Component} from 'react'
import {db} from '../../firebase/config'
import {auth} from '../../firebase/config'


class Profile extends Component {
    constructor(props){
      super(props)
      this.state = {
        name:[],
        email:[],
        date:[],
        numberPosts:[],
        post: []

      }
      // componentDidMount(){
      //   db.collection('posts').where('owner', '==', 'emailDelPerfil').onSnapshot(
      //     (docs)=>{
      //       let post = []
      //       docs.forEach(
      //         doc => {
      //           post.push({
      //             id:doc.id,
      //             data: doc.data()
      //           })
      //         }
      //       )
      //       this.setState({
      //         post:post,
      //       })

    
      // }
      // }
    }

      logout(){
        auth.signOut()
      }
    
    render(){
      return (
        <View>
          <Text>name:</Text>
        <Text> email: </Text>
        <Text> Cantidad de posteos: </Text>
        <Text>Ultima vez conectado: </Text>

          {/* <FlatList 
            data={this.state.post}
            keyExtractor={}
            renderItem={}
          
          /> */}

        </View>
      )
    }
  }
  
export default Profile