import { View,ActivityIndicator, Text, StyleSheet,Modal, Button,ToastAndroid, TextInput,TouchableOpacity, Image, Alert } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import { useState } from 'react'
import { useUser } from '@clerk/clerk-expo';
import { fonts } from '../../../assets/theme';
import * as ImagePicker from 'expo-image-picker';
import {  uploadToFirebase } from '../../../firebase-config';


const addBook = () => {

const { user } = useUser();

const [status, setStatus] = useState(null);
const [isFocusTypeStatus, setIsFocusTypeStatus] = useState(false);

const [txt_baslik,setBaslik] = useState(false);
const [isLoading,setLoading] = useState('');
const [txt_yazarAdi,setYazarAdi] = useState('');
const [txt_aciklama,setAciklama] = useState('');
const [txt_fiyat,setFiyat] = useState('');
const [image_url,setImageUrl] = useState('')

const durum = [
  { label: 'Yıpranmış', value: 'Yıpranmış' },
  { label: 'İyi', value: 'İyi' },
  { label: 'Yeni Gibi', value: 'Yeni Gibi' },
  { label: 'Yeni', value: 'Yeni' },
];

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
    if(!image_url||!txt_aciklama||!txt_fiyat||!status){
      ToastAndroid.show('Hicbir alani bos birakmayiniz !', ToastAndroid.LONG);
    }
    else{
     setLoading(true)
     await axios.post('http://192.168.1.114:8000/products',book)
    .then((response) => {
      console.log(response);
    }).finally(() => {
      setLoading(false)
    });
    }
  
  };
  const foto = async () =>{
    let result = await ImagePicker.launchCameraAsync({
      ediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
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
    
          if(txt_baslik == ''){
            console.log('Ilan basligini bos birakmayiniz !')
            ToastAndroid.show("Ilan basligini bos birakmayiniz !", ToastAndroid.LONG);
            
            }
            else{
              console.log('chatgpt')
            setLoading(true)
            await axios.get('http://192.168.1.114:5000/endpoint/'+txt_baslik+'.'+status)
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
        placeholder=" Ilan Basligi"
        placeholderTextColor="#000"
        onChangeText={(text) => setBaslik(text)}
        //value={txt_baslik}
        />

        <Dropdown
          style={[styles.dropdown, isFocusTypeStatus && { borderColor: '159C97'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={durum}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocusTypeStatus ? 'Durum' : '...'}
          searchPlaceholder="Search..."
          value={status}
          onFocus={() => setIsFocusTypeStatus(true)}
          onBlur={() => setIsFocusTypeStatus(false)}
          onChange={item => {
            setStatus(item.value);
            setIsFocusTypeStatus(false);
          }}
          
        />

        <TextInput
        multiline={true}
        style={styles.textInputDescStyle}
        placeholder=" Açıklama"
        value={txt_aciklama}
        placeholderTextColor="#000"
        onChangeText={(text) => setAciklama(text)}
        />

      <TouchableOpacity onPress={yardimAl}>
          <Image style={{width:25, height:25}} source={{uri:"https://firebasestorage.googleapis.com/v0/b/unimarket-764cb.appspot.com/o/icons8-chatgpt-24%20(1).png?alt=media&token=054973c8-39a0-43ac-8faa-e648d2d8dd89"}}></Image>
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
            <Text>Dusunuyor...</Text>
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
    dropDownStlye:{
      height: 40,
      width: 220
    },
    dropdown: {
      height: 50,
      width: 330,
      borderColor: '#8F8F8F',
      borderWidth: 2,
      borderRadius: 8,
      paddingHorizontal: 10,
      marginTop:30,
      
      
    },
    placeholderStyle: {
        fontSize: 20,
        
      },
      selectedTextStyle: {
        fontSize: 16,
        
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
        
      },

})
export default addBook