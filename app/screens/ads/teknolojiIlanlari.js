import { View, Text,StyleSheet,ScrollView,Image, TouchableOpacity  } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { fonts } from '../../../assets/theme';
import { FlatList } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const MAX_TEXT_LENGTH = 15; 

const kisaText = (text,length) => {
  if (text.length > length) {
    return text.substring(0, length - 3) + '...';
  }
  return text;
}
const randomColor =() =>{
  const color = Math.floor(Math.random()*16777215).toString(16).padStart(6,'0')

  return `#${color}`;
}

const teknolojiIlanlari = () => {
    const [book, setBook] = useState([]);
    const fetchData = () => {
        axios.get('http://192.168.1.114:8000/technologies')
          .then((response) => {
            setBook(response.data.children);
            console.log(response.data.children)
          })
          .catch((error) => {
            console.error('Veri çekme hatası:', error);
          });
      };
    
      useEffect(() => {
        fetchData(); 
      }, []);

  return (
    <View>
    
          
      <ScrollView  horizontal= {false} style={{marginTop:0}}>
     
      {book.map(item => {
        const title = item.title || 'Başlık Yok';
        const price = item.price || 'Fiyat Bilgisi Yok';
        const description = item.description || 'Açıklama yok';
        const thumbnail = item.image_url
        const product_id = item.product_id;
        return (
          <View key={item.id} style={styles.container}>
            
            <Link href={{
                pathname: "./urunDetay",
                params: { product_id : product_id }
              }} asChild>
              <TouchableOpacity style={{marginLeft:10}}>
              <View style={{...styles.cardViewStyle,backgroundColor:randomColor()}}>
                  <View style={{marginLeft:100,}}>
                    <Text style={styles.textStylePrice}>₺{price}</Text>
                    <Text style={styles.textStyleBookName}>{kisaText(title,20)}</Text> 
                    <Text style={styles.textStyleDescription}>{kisaText(description,55)}</Text>
                    <TouchableOpacity style={{alignSelf:'flex-end', padding:10}} onPress={() => deleteProduct(product_id)}>
                      <MaterialIcons name="delete-outline" size={24} color="white" />
                    </TouchableOpacity >
                  </View>
                 
                 </View>


              <View style={{position:'absolute'}}>
                
                  <Image source={{ uri: thumbnail}} style={styles.iconStyle} />
                
              </View>  
              </TouchableOpacity>
              
            </Link>
            <View style={{borderWidth:0.25}}></View>
            
            
          </View>
        )

      })}
        
    </ScrollView>
    </View>
    
  )
}
const styles = StyleSheet.create({

  container: {
  
    width:'100%', 
    height: 250, 
    
    
  },
  cardViewStyle:{
    marginTop:50,
    borderRadius:30, 
  
    height:'80%', 
    width:'90%',
    alignSelf:'flex-end',
    marginRight:4,
    shadowColor:'black',
    shadowOffset: {
      width:10,
      height: 100
    },
    shadowOpacity: 2,
    shadowRadius: 0,
    elevation: 20
  },
  textHeaderStyle:{
    
    fontSize:25,
    marginLeft:0,
    marginTop:20,
    color:'white',
    alignSelf:'center'
    
  },
   textStyleBookName: {
    marginTop: 10,
    marginLeft:0,
    fontSize: 20,
    fontWeight:'bold',
    position:'absolute',
    color:'white'
    
   },
   textStyleDescription: {
    marginTop:60,
    marginLeft:0,
    fontSize: 20,
    position:'absolute',
    color:'white'
    
   },
   textStylePrice: {
    marginTop:150,
    marginRight:100,
    alignSelf:'flex-end',
    fontSize:25,
    position:'absolute',
    color:'white',
    fontWeight:'bold',
    
   },
   iconStyle:{
    position:'absolute',
    width:120,
    height:200,
    marginTop:30,
    borderRadius:25
    
   }
    
  


})
export default teknolojiIlanlari