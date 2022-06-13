import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, {Component} from 'react'
import { FontAwesome } from '@expo/vector-icons'
import firebase from 'firebase'
import {auth, db} from '../../firebase/config'


class Comments extends Component {

    constructor(props){
        super(props)
        this.state={
            comments:[],
            newComment:''
        } 
    }

    componentDidMount(){
        const idDelDocumentoAModificar = this.props.route.params.id
            db
            // metodo collection: indicar la coleccion sobre la cual vamos a modificar un documento. 
            .collection('posts')
            // metodo doc es para identificar el documento que vamos a modificar dentro de () id que firebase le asigno al documento
            .doc(idDelDocumentoAModificar)
            .onSnapshot(doc => {
                this.setState({
                    comments:doc.data().comments
                })
            })
    }
}


export default Comments