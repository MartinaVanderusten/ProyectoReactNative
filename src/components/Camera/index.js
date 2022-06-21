import React, { Component } from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image, TextInput} from 'react-native'
import {Camera} from 'expo-camera'
import { storage } from '../../firebase/config'

export default class MyCamera extends Component {
    constructor(props){
        super(props)
        this.state={
            permisos: false,
            urlFoto:'',
            mostrarCamara: true
        }
        this.metodosDeCamara = undefined
    }
    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(()=>{
            this.setState({permisos: true})
        })
        .catch(error => console.log(error))
        console.log(Camera)
    }

    tomaLaFoto(){
        console.log('take picture')
        this.metodosDeCamara.takePictureAsync()
        .then(dataFoto => {
            console.log(dataFoto)
            this.setState({
                urlFoto: dataFoto.uri,
                mostrarCamara:false
            })
        })
        .catch(error => console.log(error))
    }
    guardarFoto(){
        fetch(this.state.urlFoto)
        .then(response => {
            // console.log(response)    
            return response.blob()
            //blob interpeta el archivo binario y transformarlo para que javascript lo entienda.
        })
        .then(foto => {
            // console.log(foto)
            const referenciaDelStorage = storage.ref(`photos/${Date.now()}.jpg`)
            // console.log(referenciaDelStorage)

            referenciaDelStorage.put(foto)
            .then(()=>{
                referenciaDelStorage.getDownloadURL()
                .then( url => {
                    console.log(url)
                    this.props.cuandoSubaLaImagen(url);
                    this.setState({photo:''})
                })
            })
        })
        .catch(error => console.log(error))
    }

    descartarFoto(){
       this.setState({
        mostrarCamara: true,
        urlFoto:""
       })
    }


  render() {
    return (
        <View style={styles.container}>
        {
            this.state.permisos ?
                this.state.mostrarCamara === false ?
                <>
                    
                    <Image style={styles.foto}
                    source={{uri: this.state.urlFoto}}
                    />
                   
                    <View style={styles.aceptar}>
                        <TouchableOpacity style={styles.button} onPress={()=> this.guardarFoto()}>
                            <Text>
                                Aceptar
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={()=> this.descartarFoto()}>
                            <Text>
                                Rechazar
                            </Text>
                        </TouchableOpacity>
                    </View>
                

                </>

                :
                <>
                    <View style={styles.camara}>
                    <Camera
                        type={Camera.Constants.Type.back}
                        ref={ metodos => this.metodosDeCamara = metodos}
                    /> 
                    </View>
                    <TouchableOpacity style={styles.button} onPress = {()=> this.tomaLaFoto()}>
                        <Text>Take picture</Text>
                    </TouchableOpacity>
                </>
            :

            <Text>No tienes permisos para usar la Cámara</Text>
        }
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#e76f51',
        alignContent:'center',
        alignItems: 'center',
        justifyContent:'center',
        width: '100%',
    },

    camara:{
      flex:5/7,  
      aspectRatio:1/1,
      width: '60%',
    },

    button:{
        flex:1/7,
        justifyContent:'center',
        alignItems: 'center',
        width:'14%',
        backgroundColor:'#e9c46a',
        borderRadius: '10px',
        marginTop:10
        
    },

    foto:{
        flex:5/7,  
        aspectRatio:1/1,
    },

    aceptar:{
        flex:1/7,
        justifyContent:'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
    }
})