import { View, Text, StyleSheet } from 'react-native'
import React, {useState,useEffect} from 'react'
import axios from 'axios'
import { useFonts } from 'expo-font';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { fonts } from '../../assets/theme';
import Category from '../../components/Category';


const IlanVer = () => {

  const [category, setCategory] = useState([]);
    const fetchData = () => {
        axios.get('http://192.168.1.114:8000/categories')
          .then((response) => {
            setCategory(response.data.children);
            console.log(response.data.children)
          })
          .catch((error) => {
            console.error('Veri çekme hatası:', error);
          });
      };
    
      useEffect(() => {
        fetchData(); 
      }, []);

const addBook = ()=>{
  router.replace('../screens/addProduct/addBook')
}

  return (
    <View style = {{flex:1,backgroundColor:'#DADBDA'}}>
      <View>
        <Text style={styles.textStyle}>Kategoriler</Text>
      </View>

      <ScrollView>
        {category.map(item => {
          return(
           <View>
            <TouchableOpacity onPress={addBook}>
              <Category title={item.name} url={item.image_url}/>
            </TouchableOpacity> 
           </View> 

          )
        })}
       
        
      </ScrollView>

        

    </View>
    
  )
}

export default IlanVer

const styles=StyleSheet.create({
    textStyle:{
      fontSize: 40,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
      

    },
    textHeaderStyle:{
      
      fontSize:25,
      marginLeft:0,
      marginTop:50,
      color:'white',
      alignSelf:'center'
      
    },
    buttonStyle:{
      width:175,
      height:55,
      backgroundColor: '#4F80FF',
      alignItems: 'center',
      borderRadius: 15,
      
      textAlignVertical: 'center',
      textAlign: 'center',
      
      
    },
    buttonTextStyle:{
      fontSize:30,  
      color: '#fff', 
      width: '100%',
      
      

    }
})