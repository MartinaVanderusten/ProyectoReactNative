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

                <View>
                    <Text>Escribi la descripción</Text>
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
            }
            </>

        )
    }
}

const styles = StyleSheet.create({
    textarea:{
        borderWidth:1,
        borderColor:'#c3c3c3',
        height:'auto',
        minHeight:60,
        marginTop:10
    },
    btn:{
        marginTop:16,
        borderColor:'red',
        borderWidth:1
    }
})

export default NewPost