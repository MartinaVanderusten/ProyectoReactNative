import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, {Component} from 'react'
import {db} from '../../firebase/config'
import {auth} from '../../firebase/config'
import User from '../../components/User'
import PostPerfil from '../../components/PostPerfil'
import Login from '../Login'


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
   
    }
    
    render(){
      return (
        <View  style={styles.body}>
          <View>
           <FlatList
          data={this.state.name}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <User info={item}/>}
          />
          </View>
         
        <Text>Última conexión: {auth.currentUser.metadata.lastSignInTime}</Text>
        <Text>Posteos: {this.state.numeroPosts}</Text>

        <View style={styles.btnLogout}>
          <TouchableOpacity onPress={()=>this.props.route.params.logout()}>
                  <Text>Log out</Text>
          </TouchableOpacity>
       </View> 
        
           <FlatList
          data={this.state.posteos}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <PostPerfil info={item} navigation={this.props.navigation}/>}
          />
         
        </View>

      )
    }
  }
  const styles = StyleSheet.create({
      body:{
        paddingTop:50,
        flex:1,
        alignItems:'center',
        alignContent:'center',
        justifyContent:'center',
        backgroundColor:'#f4a261'
    },
    btnLogout: {
      padding:10,
      backgroundColor:'#2a9d8f',
      borderRadius:'10px',
      margin: 5,

    }
  })
  
export default Profile