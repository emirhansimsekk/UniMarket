import { View, Text,StyleSheet,ScrollView,Image, TouchableOpacity  } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FlatList } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '../../../assets/theme';

const MAX_TEXT_LENGTH = 15; 

const kisaText = (text,length) => {
  if (text.length > length) {
    return text.substring(0, length - 3) + '...';
  }
  return text;
}

const kitapIlanlari = () => {
    const [book, setBook] = useState([]);
    const fetchData = () => {
        axios.get('http://192.168.1.114:8000/books')
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
        const author = item.author || 'Yazar Bilgisi Yok';
        const price = item.price || 'Fiyat Bilgisi Yok';
        const description = item.description || 'Açıklama yok';
        const image = item.image_url
        const product_id = item.product_id;
        return (
          <View key={item.id} style={styles.container}>
            
            <Link href={{
                pathname: "./urunDetay",
                params: { product_id : product_id }
              }} asChild>
              <TouchableOpacity style={{marginLeft:10}}>
                <Image source={{ uri: image}} style={styles.iconStyle} />
                <Text style={styles.textStylePrice}>{price} TL</Text>
                <Text style={styles.textStyleBookName}>{kisaText(title,20)}</Text> 
                <Text style={styles.textStyleDescription}>{kisaText(description,100)}</Text>
                
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
  
  width:420, 
  height: 250, 
  backgroundColor: '#fff', 
  borderWidth:0, 
  margin: 0, 
  borderRadius: 0,
  
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
  marginLeft:125,
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
export default kitapIlanlari