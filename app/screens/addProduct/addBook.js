import { View,ActivityIndicator, Text, StyleSheet,Modal, Button,ToastAndroid, TextInput,TouchableOpacity, Image, Alert, TouchableOpacityComponent } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';
import axios from 'axios';
import { useState } from 'react'
import { useUser } from '@clerk/clerk-expo';
import { fonts } from '../../../assets/theme';
import * as ImagePicker from 'expo-image-picker';
import {  uploadToFirebase } from '../../../firebase-config';


const addBook = () => {

const { user } = useUser();
const [txt_baslik,setBaslik] = useState(false);
const [isLoading,setLoading] = useState('');
const [txt_yazarAdi,setYazarAdi] = useState('');
const [txt_aciklama,setAciklama] = useState('');
const [txt_fiyat,setFiyat] = useState('');
const [image_url,setImageUrl] = useState('')

  const ekle = async() => {
    var book = {
      title: txt_baslik, 
      category_id: 1,      
      description: txt_aciklama,                 
      price: txt_fiyat,
      image_url : image_url,
      user_id: user.id,
    
    }
    console.log(image_url)
    if(!image_url||!txt_aciklama||!txt_fiyat||!txt_yazarAdi||!txt_aciklama){
      ToastAndroid.show('Hicbir alani bos birakmayiniz !', ToastAndroid.LONG);
    }
    else{
     await axios.post('http://192.168.1.114:8000/products',book)
    .then((response) => {
      console.log(response);

    });  
    }
  
  };
  const foto = async () =>{
    let result = await ImagePicker.launchCameraAsync({
      ediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    })
    const image = result.assets[0]
    const fileName = new Date().getTime() + '.jpeg';
    console.log('uri'+image.uri)
    console.log('filename'+fileName)
    try{
      const uploadImage = await uploadToFirebase(image.uri,fileName,"v")
      console.log('uri'+image.uri)
      console.log('filename'+fileName)
      console.log('url '+uploadImage.downloadUrl)
      setImageUrl(uploadImage.downloadUrl)
    }
    catch(e) {
      ToastAndroid.show('Resim yuklenemedi !', ToastAndroid.LONG);
    }
    
  }
  const chatGPT = async() =>{
    console.log('chatgpt')
    
          if(txt_baslik===''){
            console.log('Ilan basligini bos birakmayiniz !')
            ToastAndroid.show('Ilan basligini bos birakmayiniz !', ToastAndroid.LONG);
          
            }
            else{
              console.log('chatgpt')
            setLoading(true)
            await axios.get('http://192.168.1.114:5000/endpoint/'+txt_baslik)
            .then((response) => {
              const data = JSON.parse(response.data.data); // İlan açıklamasını çıkarmak için JSON.parse kullanabilirsiniz
              const aciklama = data.ilan_aciklamasi;
              setAciklama(aciklama)
              console.log(txt_baslik);
              console.log(aciklama);
              
  
            }).catch(error => {
              console.error('GET isteği sırasında bir hata oluştu:', error);
            }).finally(() => {
              setLoading(false)
            });
            }
        
  }
  const yardimAl = () => {
    
    Alert.alert('Yardim Al', 'Bu ozellik sayesinde girdiginiz ilan basligina gore yapay zeka bir aciklama olusturur. Bunun icin once ilan basligi girmeniz gerekmektedir.', [
      {
        text: 'Vazgec',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Yardim Al', onPress: () => {chatGPT();}},
    ]);
    
    
  };

  return (
    <View>
     
      <View style={styles.container}>
        
      <TextInput
        style={styles.textInputStyle}
        placeholder=" Kitap Adı"
        placeholderTextColor="#000"
        onChangeText={(text) => setBaslik(text)}
        //value={txt_baslik}
        />
      <TextInput
        style={styles.textInputStyle}
        placeholder=" Yazar Adı"
        placeholderTextColor="#000"
        onChangeText={(text) => setYazarAdi(text)}/>
        <TextInput
        multiline={true}
        style={styles.textInputDescStyle}
        placeholder=" Açıklama"
        value={txt_aciklama}
        placeholderTextColor="#000"
        onChangeText={(text) => setAciklama(text)}
        />

        <TouchableOpacity onPress={yardimAl}>
          <Text>Yardim al</Text>
        </TouchableOpacity>

        <TextInput
        style={styles.textInputStyle}
        placeholder=" Fiyat"
        placeholderTextColor="#000"
        keyboardType='numeric'
        onChangeText={(text) => setFiyat(text)}
        />
    <View style={styles.button}>
      <Button
        
        title='Ekle' onPress={ekle}
      /> 
       <Button
        
        title='foto' onPress={foto}
      /> 
    </View>
    <Modal
        animationType='fade'
        transparent={true}
        visible={isLoading}
        onRequestClose={() => setIsLoading(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </View>
      </Modal>
      
    </View>
    
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
         
        fontSize: 25,
        color: '#3AB4BA',
        alignItems: 'flex-start',
        
        marginTop: 80,
        marginLeft:30
    },
    textHeaderStyle:{
     
      fontSize:25,
      marginLeft:0,
      marginTop:50,
      color:'white',
      alignSelf:'center'
      
    },
    textInputStyle:{
      
      borderColor: '#000',
      borderWidth: 2,
      borderRadius: 8,
      borderColor: '#8F8F8F',
      width: '90%',
      height: 40,
      fontSize: 20,
      opacity: 1,
      marginTop: 20,
      
      paddingHorizontal:10
    },
    textInputDescStyle:{
      
      borderColor: '#000',
      borderWidth: 2,
      borderRadius: 8,
      borderColor: '#8F8F8F',
      width: '90%',
      height: 150,
      fontSize: 20,
      opacity: 1,
      marginTop: 20,
      textAlignVertical:'top',
      padding:10
    },
    image:{
      position:'absolute',
      width:220,
      height:100,
      marginLeft: 100,
      marginTop:150
      
    },
    button:{
      color:'#004BFE',
      marginTop:30,
      alignSelf:'flex-end',
      marginRight:60,
      width:100,
      height:100,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Arkaplan rengi ve şeffaflığı
    },
    modalContent: {
      
      padding: 20,
      borderRadius: 10,
      
    },

})
export default addBook