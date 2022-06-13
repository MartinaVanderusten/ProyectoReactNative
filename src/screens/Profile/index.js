import { View, FlatList } from 'react-native'
import React, {Component} from 'react'
import {db} from '../../firebase/config'


class Profile extends Component {
    constructor(props){
      super(props)
      this.state = {
        name:[],
        email:[],
        date:[],
        numberPosts:[],

      }
      // componentDidMount(){
      //   db.collection('post').onSnapshot(
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
      //         name:post,
      //       })

    
      // }
      // }

    }
    render(){
      return (
        <View>
          {/* <FlatList 
            data={}
            keyExtractor={}
            renderItem={}
          
          /> */}
        </View>
      )
    }
  }
  
export default Profile