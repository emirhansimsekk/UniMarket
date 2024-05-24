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
  const BASE_URL = "http://192.168.1.112:8000"
  const [category, setCategory] = useState([]);
    const fetchData = () => {
        axios.get(`${BASE_URL}/categories`)
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

const addScreen = (category_id)=>{
  console.log(category_id)
  if(category_id==1){
    router.push("../screens/addProduct/addBook")
  }
  else if(category_id==2){
    router.push("../screens/addProduct/addTechnology")
  }
  else if(category_id==3){
    router.push("../screens/addProduct/addSportEquipment")
  }
  else if(category_id==4){
    router.push("../screens/addProduct/addCloth")
  }
  
}

  return (
    <View style = {{flex:1,backgroundColor:'#F2F2F2'}}>


      <ScrollView style ={{marginTop:20}}>
        {category.map(item => {
          category_id = item.category_id;
          return(
           <View>
            <TouchableOpacity onPress={() => addScreen(item.category_id)}>
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