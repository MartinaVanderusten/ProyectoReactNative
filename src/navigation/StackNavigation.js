//Componentes de terceros
import React, {Component} from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { auth } from '../firebase/config';

//Componentes propios
import Login from '../screens/Login/index'
import Register from '../screens/Register/index'
import TabNavigation from '../navigation/TabNavigation'
import Comments from '../screens/Comments/index'

//Desarrollo del código
const Stack = createNativeStackNavigator() //Abreviación del Stack

class StackNavigation extends Component{
    constructor(props){
        super(props)
        this.state = {
            loggedIn: false,
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if(user){
                this.setState({loggedIn: true})
            }
        })
    }

    logout(){
        auth.signOut()
        .then(response => this.setState({loggedIn:false}))
        .catch(error => console.log(error))
    }

    render(){
        return(
            <NavigationContainer>
                <Stack.Navigator>
                    {
                        this.state.loggedIn ?
                        <Stack.Group>
                            <Stack.Screen name='TabNavigation' component={ TabNavigation }/>
                            <Stack.Screen name='Comment' component={ Comment }/>
                        </Stack.Group>
                        :
                        <Stack.Group>
                            <Stack.Screen name='Login' component={ Login }/>
                            <Stack.Screen name='Register' component={ Register }/>
                        </Stack.Group>
                    }
                </Stack.Navigator>
            </NavigationContainer>

        )
    }

}

export default StackNavigation