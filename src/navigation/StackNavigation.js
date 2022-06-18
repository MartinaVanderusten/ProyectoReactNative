//Componentes de terceros
import React, {Component} from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { auth, db } from '../firebase/config';

//Componentes propios
import Login from '../screens/Login/index'
import Register from '../screens/Register/index'
import TabNavigation from './TabNavigation'
import Comments from '../screens/Comments/index'

//Desarrollo del código
const Stack = createNativeStackNavigator() //Abreviación del Stack

class StackNavigation extends Component{
    constructor(props){
        super(props)
        this.state = {
            logedIn: false,
            logError:undefined,
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if(user){
                this.setState({logedIn: true})
            }
        })
    }

    signUp(username, email, password){
        auth.createUserWithEmailAndPassword(email, password)
        .then(() => db.collection('users').add({
                        owner: email,
                        name: username,
                        createdAt: Date.now(),
                    }))
        .then(() => this.setState({logedIn: true}))
        .catch(error => this.setState({logError:error.message}))
    }

    logIn(email,password){
        //Método de ingreso de Firebase
        auth.signInWithEmailAndPassword(email,password)
        .then(response => this.setState({logedIn:true}))
        .catch(error => this.setState({logError:error.message}))
    }

    errorDelete(){
        this.setState({
            logError:undefined
        })
    }

    logout(){
        auth.signOut()
        .then(response => this.setState({logedIn:false}))
        .catch(error => console.log(error))
    }

    render(){
        return(
            <NavigationContainer>
                <Stack.Navigator>
                    {
                        this.state.logedIn ?
                        <Stack.Group>
                            <Stack.Screen name='TabNavigation' component={ TabNavigation } options={{headerShown:false}}/>
                            <Stack.Screen name='Comments' component={ Comments } options={{headerShown:false}}/>
                        </Stack.Group>
                        :
                        <Stack.Group>
                            <Stack.Screen
                                name='Login'
                                options={{headerShown:false}}
                                children={(props)=><Login
                                        error={this.state.logError}
                                        errorDelete={()=>this.errorDelete()}
                                        logIn={(email,password)=>this.logIn(email,password)}
                                        {...props}/>}
                            />
                            <Stack.Screen
                                name='Register'
                                options={{headerShown:false}}
                                children={(props)=><Register
                                        error={this.state.logError}
                                        errorDelete={()=>this.errorDelete()}
                                        signUp={(username, email, password)=>this.signUp(username, email, password)}
                                        {...props}/>}
                            />
                        </Stack.Group>
                    }
                </Stack.Navigator>
            </NavigationContainer>

        )
    }

}

export default StackNavigation