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
    // const milike=this.props.info.data.likes.includes(auth.currentUser.email)
    if( 
        this.props.info.data.likes        
    )
    {
        this.setState({
            cantidadLikes: this.props.info.data.likes.length
        })
    } console.log(this.props.info.data.likes)
    // if(
    //     milike 
    // ) {
    //     this.setState({
    //         islike: true
    //     })
            
        
    // }
}

    like(){
        this.setState({
            islike: true
        })
    
    }
    dislike(){
        this.setState({
            islike: false
        })
    }
 render(){
     return(
         <View>
             <View>
                 <Image style={styles.image} 
                 source={{uri:"https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/202.png"}}/> 
                 <Text>
                     Lorem 
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
                 </View>
             </View>
         </View>

     )
 } 
}
const styles = StyleSheet.create({
    card: {

    },
    image: {
        height: 100,
        width: 100
    }
})

export default Post;