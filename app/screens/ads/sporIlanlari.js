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

const sporIlanlari = () => {
    const [book, setBook] = useState([]);
    const fetchData = () => {
        axios.get('http://192.168.1.108:8000/sports')
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
      <View style={{width:410,height:70,backgroundColor:'#004BFE',position:'absolute',alignSelf:'flex-end',borderBottomEndRadius:20,borderBottomStartRadius:20}}>
          <Text style={styles.textHeaderStyle}>Spor Ürünleri</Text>
          </View>
        
          <Link href={{
                    pathname: "../(auth)/home",
                    
                  }} asChild>
          <TouchableOpacity>
            <Ionicons name="chevron-back-outline" size={35} color="white" style={{marginLeft:10,marginTop:20}} />
          </TouchableOpacity>
        </Link> 
      <ScrollView  horizontal= {false} style={{marginTop:40}}>
     
      {book.map(item => {
        const title = item.title || 'Başlık Yok';
        const price = item.price || 'Fiyat Bilgisi Yok';
        const description = item.description || 'Açıklama yok';
        const thumbnail = "http://books.google.com/books/content?id=bnu5EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        const product_id = item.product_id;
        return (
          <View key={item.id} style={styles.container}>
            
            <Link href={{
                pathname: "./urunDetay",
                params: { product_id : product_id }
              }} asChild>
              <TouchableOpacity style={{marginLeft:10}}>
                <Image source={{ uri: thumbnail}} style={styles.iconStyle} />
                <Text style={styles.textStylePrice}>{price} TL</Text>
                <Text style={styles.textStyleBookName}>{kisaText(title,20)}</Text> 
                <Text style={styles.textStyleDescription}>{kisaText(description,55)}</Text>
                
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
  fontFamily:fonts.semiBold,
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
  fontFamily:fonts.semiBold
 },
 textStyleDescription: {
  marginTop:40,
  marginLeft:130,
  fontSize: 20,
  position:'absolute',
  fontFamily:fonts.extraLightItalic
 },
 textStylePrice: {
  marginTop:150,
  marginLeft:130,
  fontSize:25,
  position:'absolute',
  fontFamily:fonts.semiBold
 },
 iconStyle:{
  position:'absolute',
  width:120,
  height:120,
  marginTop:30
  
 }
  


})
export default sporIlanlari