import { View, Text } from 'react-native';
import React, {Component} from 'react';
import { auth } from '../../firebase/config';
import {db} from '../../firebase/config'

class User extends Component {
    constructor(props){
        super(props)
        this.state={
            name:'',
            email:'',
            ultimaConexion:'',
            loggedIn: false,
            
        }
    }
componentDidMount(){
    auth.onAuthStateChanged(user => {
        if(user){
            this.setState({logedIn: true})
        }
    })
    
}

    // name(){
    //     if(user)
    //     {
    //         this.setState({
    //             nombre: this.props.info.data.name
    //         })
    //     } console.log(nombre)
       
    // }    


    render(){
        const documento = this.props.info.data
        return (
            <View>
                 <Text>Nombre: {documento.name}</Text>
                <Text>Email: {documento.owner}</Text>
               
              
            </View>
        )
    }
}

export default User;