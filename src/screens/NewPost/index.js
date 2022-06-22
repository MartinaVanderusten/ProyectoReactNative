import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, {Component} from 'react'
import MyCamera from '../../components/Camera/index'
import {db,auth} from '../../firebase/config'

class NewPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            description:'',
            mostrarComponenteCamara: true,
            urlFoto:''
        }
    }

    cuandoSubaLaImagen(url){
        console.log(url)
        this.setState({
            mostrarComponenteCamara:false,
            urlFoto: url
        })
    }

    newPost(){
        db.collection('posts').add({
            owner:auth.currentUser.email,
            createdAt: Date.now(),
            description:this.state.description,
            likes:[],
            comments:[],
            foto:this.state.urlFoto
        })
        .then(response => {
          this.setState({
            descrpition:''
          })
          this.props.navigation.navigate('Home')
        })
        .catch(error => console.log(error.message))
    }

    render(){

        return (
            <>
            {
                this.state.mostrarComponenteCamara ?
                <MyCamera cuandoSubaLaImagen={(url)=> this.cuandoSubaLaImagen(url)}/>
                :

                <View style={styles.body}>

                <View style={styles.captionContainer}>
                    <Text>Write caption to post:</Text>
                    <TextInput 
                    style={styles.textarea}
                    onChangeText= {(text)=> this.setState({
                        description: text
                    })}
                    value={this.state.description}
                    />
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() =>this.newPost() }
                        disabled={this.state.description === ''? true: false}
                    >
                        <Text>Post</Text>
                    </TouchableOpacity>
                </View>
                                </View>

            }
            </>

        )
    }
}

const styles = StyleSheet.create({

    body:{
        backgroundColor:'#f4a261',
        alignItems: 'center',
        flex: '1'

    },
  
    textarea:{
        borderWidth:1,
        borderColor:'#264653',
        width: '300px',
        height:'40',
        marginTop:10,
        backgroundColor:'#f4a261',
        alignItems: 'center',

       

    },
    btn:{
        marginTop:16,
        borderColor:'#264653',
        borderWidth:1,
        alignItems: 'center',
        borderRadius:'3px',
        width:'20%',
        justifyContent:'center',
        backgroundColor:'#e9c46a',

        
    },

    captionContainer:{
        backgroundColor:'#f4a261',
        marginTop:50,

    }

   
   
})

export default NewPost