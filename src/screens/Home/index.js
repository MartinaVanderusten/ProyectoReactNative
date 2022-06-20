import React, {Component} from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList} from 'react-native'
import {db} from '../../firebase/config'
import Post from '../../components/Post'
import { FontAwesome5 } from '@expo/vector-icons';


class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      posteos: [],
      posteosSearch: [],
      emailSearch:"",
      search:false,
    }
  }

  componentDidMount(){
    db.collection('posts').orderBy('createdAt', 'desc')
    .onSnapshot(
      docs=> {
        let posteosArray = []
        docs.forEach(
          doc => {
            posteosArray.push({
              id:doc.id,
              data: doc.data()
            })
          }
        )
        this.setState({
          posteos:posteosArray,
          posteosSearch:posteosArray,
          search:true
        }, ()=> console.log(this.state.posteosSearch))
      }
    )
  }

  send(){
    if (this.state.emailSearch.length > 0) {
      db.collection('posts')
      .where('owner','==',this.state.emailSearch)
      .onSnapshot(
        docs=> {
          let posteos = []
          docs.forEach(
            doc => {
              posteos.push({
                id:doc.id,
                data: doc.data()
              })
            }
          )
          if (posteos.length > 0) {
            this.setState({
              posteosSearch:posteos,
              search:true,
            })
          }else{
            this.setState({
              search:false,
            })
          }
        }
      )
    }else{
      db.collection('posts')
      .where('owner','!=',this.state.emailSearch)
      .onSnapshot(
        docs=> {
          let posteos = []
          docs.forEach(
            doc => {
              posteos.push({
                id:doc.id,
                data: doc.data()
              })
            }
          )
          this.setState({
            posteosSearch:posteos,
            search:true,
          })
        }
      )
    }
  }

  render(){
    return (
      <View style={styles.body}>
        {/** Menú de búsqueda */}
        <View style={styles.header}>
        <View style={styles.search}>
            <TextInput style={styles.textInput}
                keyboardType='email-address'
                placeholder='e-mail del usuario'
                onChangeText={ text => this.setState({ emailSearch:text }) }
            />
            <TouchableOpacity onPress={() =>this.send()}>
              <FontAwesome5 name="search" size={15} color="black" style={styles.send}/>
            </TouchableOpacity>
          </View>
        </View>
        {/** Contenido del home */}
        <View style={styles.container}>
          { 
          this.state.search ?
          <FlatList style={styles.posts}
          data={this.state.posteosSearch}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <Post info={item} navigation={this.props.navigation}/>}
          />
              /* <ActivityIndicator size='large' color='blue' /> */
            :
              <Text style={styles.noResult}>El usuario no existe o aún no tiene publicaciones.</Text>
          }
        </View>
      </View>
    )
  }
}
export default Home;

const styles = StyleSheet.create({
  body:{
    flex:1,
    alignItems:'center',
    alignContent:'center',
    justifyContent:'center',
    backgroundColor:'#e9c46a',
  },
  container:{
    flex:6/7,
    alignItems:'center',
    alignContent:'center',
    justifyContent:'center',
  },
  header:{
    flex:1/7,
    alignItems:'center',
    alignContent:'center',
    justifyContent:'center',
    width:'100%',
  },
  search:{
    flexDirection:'row',
    justifyContent:'center',
    width:'72%',
  },
  textInput:{
    height:36,
    width:'100%',
    maxWidth:414,
    marginRight:15,
    padding:10,
    backgroundColor:'#2a9d8f',
    placeholderTextColor:'#1a1a1a',
    borderRadius:10,
    borderWidth:2,
    borderColor:'#264653',
  },
  send:{
    height:36,
    aspectRatio:'1/1',
    padding:10,
    backgroundColor:'#2a9d8f',
    borderRadius:'50%',
    borderWidth:2,
    borderColor:'#264653',
  },
  noResult:{
    width:'60%',
    textAlign:'center',
  }
})