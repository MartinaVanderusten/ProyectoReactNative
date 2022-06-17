import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {FontAwesome} from '@expo/vector-icons'
import {auth} from '../../firebase/config'

class Post extends Component {
    constructor(props){
        super(props)
        this.state={
            islike: false,
            cantidadLikes: 0,
            comentarios: [],
        }
    }
componentDidMount(){
    const milike=this.props.info.data.likes.includes(auth.currentUser.email)
    if( 
        this.props.info.data.likes        
    )
    {
        this.setState({
            cantidadLikes: this.props.info.data.likes.length
        })
    } console.log(this.props.info.data.likes)
    if(
        milike 
    ) {
        this.setState({
            islike: true
        })
            
        
    }
}

    like(){
        this.setState({
            islike: true,
            cantidadLikes: this.state.cantidadLikes +1
        })
    
    }
    dislike(){
        this.setState({
            islike: false,
            cantidadLikes: this.state.cantidadLikes -1
        })
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
                    <Text>Comentarios: {this.props.info.data.comments}</Text>
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

export default Post;