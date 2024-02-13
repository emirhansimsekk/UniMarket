import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router';
import { useFonts } from 'expo-font';
import { useLocalSearchParams  } from 'expo-router';
import axios from 'axios'
import { fonts } from '../../../assets/theme';

const kisaText = (text,length) => {
    if (text.length > length) {
      return text.substring(0, length - 3) + '...';
    }
    return text;
  }
  const urunDetay = () => {
    
    const params = useLocalSearchParams();
    const {product_id} = params;
    console.log(product_id)
    const apiUrl = `http://192.168.1.114:8000/products/id=${product_id}`;
    const [book, setBook] = useState(null);
    const fetchData = () => {
        axios.get(apiUrl)
          .then((response) => {
            setBook(response.data.children[0]);
          })
          .catch((error) => {
            console.error('Veri çekme hatası:', error);
          });
      };
    
      useEffect(() => {
        fetchData(); 
      }, []);
      /*const fetchDataByCategory = () => {
        axios.get(`http://192.168.1.9:8000/`)
          .then((response) => {
            setBook(response.data.children);
          })
          .catch((error) => {
            console.error('Veri çekme hatası:', error);
          });
      };
    
      useEffect(() => {
        fetchData(); 
      }, []); */
      
      
      
  return (
 <View>
  {book && (
    <View>
        <View>
        <Image 
            source={{uri:book.image_url}}
            style={{width:300, height: 400, borderBottomLeftRadius: 0,borderBottomRightRadius:0,alignSelf:'center'}}
        />
      </View>
    <View style={{position:'absolute',width:400,backgroundColor:'white',height:525,marginTop:300,borderTopLeftRadius:50,borderTopRightRadius:50}}>
      <View style={{flexDirection:'row'}}>
          <View>
              <Text style={{fontSize:30, padding:15,position:'absolute',marginTop:10}}>{kisaText(book.title,20)}</Text>
              <Text style={{fontSize:15, marginLeft:15,position:'absolute',marginTop:65}}> adres</Text>
              <Text style={{fontSize:15, marginLeft:70,fontWeight:'300',position:'absolute',marginTop:65}}> numara</Text>
              
          </View>
          <View>
              <Text style={{color:'#000',marginTop:80,marginLeft:301, fontSize:20}}>{book.price} TL</Text>
          </View>
      </View>
      <Text style={{fontSize:20, marginLeft:25, fontWeight: '400',position:'absolute',marginTop:120}}>{kisaText(book.description,150)}</Text>
          
      <Text style={{fontSize:30,marginLeft:20,position:'absolute',marginTop:270}}>İlginizi Çekebilir</Text>
        
      
    </View>
    </View>    
    
    
  )}
      
 </View>
  )
}

export default urunDetay