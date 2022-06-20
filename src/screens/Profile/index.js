import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, {Component} from 'react'
import {db} from '../../firebase/config'
import {auth} from '../../firebase/config'
import User from '../../components/User'
import Post from '../../components/Post'


class Profile extends Component {
    constructor(props){
      super(props)
      this.state = {
        name:'',
       email: '',
       posteos: [],
       numeroPosts: '',
       loggedIn: true,

      }
    }
     componentDidMount(){
      
      auth.onAuthStateChanged( user => {
        if(user){
          this.setState({email: auth.currentUser.email})
      }
        console.log(user.metadata.lastSignInTime)
       console.log(user)
       console.log(this.state.email)
       db.collection('posts').where('owner', '==', this.state.email)
       .onSnapshot(
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
             numeroPosts: posteos.length
             
           }, ()=> console.log(posteos.length),console.log(this.state.email), console.log(posteos))
         } 
       )
      //  borrarPost(id){
      //   // let posteo = this.state.posteos.filter(posts => posts.id !== id)
      //   // this.setState({
      //   //   posteos: posteo
      //   // }), () => console.log(posteos)
      //  }
       db.collection('users').where('owner', '==', this.state.email)
    .onSnapshot(
      docs=> {
        let name = []
        docs.forEach(
          doc => {
            name.push({
              id:doc.id,
              data: doc.data()

            })
          }
        )
        this.setState({
          name:name
          
        }, ()=> console.log(name))
      } 
    )
      
      })
     
      
    // db.collection('users').where('owner', '==', this.state.email)
    
  //   if(
  //     this.state.posteos
  //   ) {
  //   this.setState({
  //     numeroPosts: this.state.posteos.length
  //   }, ()=>console.log(this.state.numeroPosts))
  // }
    
}
  
logout(){
  auth.signOut()
  .then(response => this.setState({logedIn:false}))
  .catch(error => console.log(error))
}
    
    render(){
      return (
        <View  style={styles.list}>
          <View>
           <FlatList
          data={this.state.name}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <User info={item}/>}
          />
          </View>
          <View>
        <TouchableOpacity onPress={() =>this.logout()}><Text>Cerrar Sesion</Text></TouchableOpacity></View>
        <Text>Ultima conexion: {auth.currentUser.metadata.lastSignInTime}</Text>
        <Text>Posteos: {this.state.numeroPosts}</Text>
        
           <FlatList
          data={this.state.posteos}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <Post info={item}/>}
          />
         
        </View>

      )
    }
  }
  const styles = StyleSheet.create({
    list:{
      flex: 1,
    }
  })
  
export default Profile