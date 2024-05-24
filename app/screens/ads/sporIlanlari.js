import { View, Text,StyleSheet,ScrollView,Image, TouchableOpacity  } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FlatList } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { fonts } from '../../../assets/theme';

const MAX_TEXT_LENGTH = 15; 
const BASE_URL = "http://192.168.1.112:8000"
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

const sporIlanlari = () => {
    const [book, setBook] = useState([]);
    const fetchData = () => {
        axios.get(`${BASE_URL}/sports`)
          .then((response) => {
            setBook(response.data.children);
            console.log(response.data.children)
          })
          .catch((error) => {
            console.error('Veri çekme hatası:', error);
          });
      };
    

  return (
    <View>

      <ScrollView  horizontal= {false} style={{marginTop:40}}>
     
      {book.map(item => {
        const title = item.title || 'Başlık Yok';
        const price = item.price || 'Fiyat Bilgisi Yok';
        const description = item.description || 'Açıklama yok';
        const thumbnail = "http://books.google.com/books/content?id=bnu5EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        const product_id = item.product_id;
        const cat_id = item.category_id;
        return (
          <View key={item.id} style={styles.container}>
            
            <Link href={{
                pathname: "./urunDetay",
                params: { product_id : product_id,
                  cat_id: cat_id  
         }
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
  marginLeft:130,
  fontSize: 20,
  position:'absolute',
  
 },
 textStyleDescription: {
  marginTop:40,
  marginLeft:130,
  fontSize: 20,
  position:'absolute',
  
 },
 textStylePrice: {
  marginTop:150,
  marginLeft:130,
  fontSize:25,
  position:'absolute',
  
 },
 iconStyle:{
  position:'absolute',
  width:120,
  height:120,
  marginTop:30
  
 }
  


})
export default sporIlanlari