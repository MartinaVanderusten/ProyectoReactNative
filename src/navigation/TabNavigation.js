//Componentes de terceros
import React, {Component} from 'react'
import { StyleSheet, } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome5 } from '@expo/vector-icons';

//Componentes propios
import Home from '../screens/Home/'
import NewPost from '../screens/NewPost/'
import Profile from '../screens/Profile/'

//Desarrollo del código
const Tab = createBottomTabNavigator()

class TabNavigation extends Component{
    constructor(props){
        super(props)
        this.state = {
        }
    }
    render(){
        return(
            <Tab.Navigator
              initialRouteName='Home'
              screenOptions={{
                tabBarShowLabel:false,
                headerShown:false,
                tabBarActiveBackgroundColor:'#2a9d8f',
                tabBarInactiveBackgroundColor:'#264653',
              }}>
                <Tab.Screen name='Home' component={Home}
                options={{tabBarIcon: () => <FontAwesome5 name="home" size={24} color="black"/>}}/>
                <Tab.Screen style={styles.profile} name='Profile' component={Profile}
                options={{tabBarIcon: () => <FontAwesome5 name="child" size={24} color="black" />}}/> 
                <Tab.Screen style={styles.newPost} name='NewPost' component={NewPost}
                options={{tabBarIcon: () => <FontAwesome5 name="upload" size={24} color="black" />}}/>
            </Tab.Navigator>
        )
    }

}

export default TabNavigation

const styles = StyleSheet.create({
    home:{
      backgroundColor:'#e9c46a',
    },
    profile:{
      backgroundColor:'#f4a261',
    },
    newPost:{
      backgroundColor:'#e76f51',
    }
})