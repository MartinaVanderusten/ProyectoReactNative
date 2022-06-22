import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {FontAwesome} from '@expo/vector-icons'
import {auth, db} from '../../firebase/config'
import firebase from 'firebase'


class PostPerfil extends Component {
    constructor(props){
        super(props)
        this.state={
            islike: false,
            cantidadLikes: this.props.info.data.likes.length,
            comentarios: [],
            posteos:[]
        }
    }
componentDidMount(){
    if( 
        this.props.info.data.likes.includes(auth.currentUser.email)        
    )
    {
        this.setState({
           islike: true
        })
    }
    auth.onAuthStateChanged( user => {
        if(user){
          this.setState({email: auth.currentUser.email})
      }
        console.log(user.metadata.lastSignInTime)
       console.log(user)
       console.log(this.state.email)
      
      })
   
}

    like(){
        db.collection('posts')
            .doc(this.props.info.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
        this.setState({
            islike: true,
            cantidadLikes: this.state.cantidadLikes +1
        })
    
    }
    dislike(){
        console.log(this.props.info)
        db.collection('posts')
            .doc(this.props.info.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
        this.setState({
            islike: false,
            cantidadLikes: this.state.cantidadLikes -1
        })
    }

    borrarPosteos(){
        db.collection("posts").doc(this.props.info.id).delete().then(() => {
            console.log("Borrado");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
        
    }


 render(){
     return(
         <View>
             <View style={styles.card}>
                 <Text>{this.props.info.data.owner}</Text>
                 <Image style={styles.image} 
                 source={this.props.info.data.foto}/> 
                 <Text>
                     {this.props.info.data.description} 
                 </Text>
                 
             </View>
             <View>
                 <View>
                        <Text> 
                            {this.state.cantidadLikes}</Text>
                    {
                        this.state.islike ? 
                        <TouchableOpacity onPress={()=> this.dislike()} >
                            <FontAwesome name='heart' size={24} color='red'/>
                        </TouchableOpacity> : 
                         <TouchableOpacity onPress={()=> this.like()}>
                         <FontAwesome name='heart-o' size={24} color='black'/>
                     </TouchableOpacity>
                    }
                    <TouchableOpacity onPress={()=> this.borrarPosteos()}> <FontAwesome name='trash' size={20} color='black'/></TouchableOpacity>
                    {/*<Text>Comentarios: {this.props.info.data.comments}</Text>*/}
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Comments', {id: this.props.info.id}) }>
                        <Text>Comments </Text>
                    </TouchableOpacity>   
                 </View>
             </View>
         </View>

     )
 } 
}
const styles = StyleSheet.create({
    card: {
    paddingTop:20,
    },
    image: {
        height: 200,
        width: 200
    }
})

export default PostPerfil;