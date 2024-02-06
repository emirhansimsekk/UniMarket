import { View, Text, StyleSheet, Button, TextInput, Image, Alert } from 'react-native'
import React from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { Link, useNavigation } from "expo-router";
import { useRouter } from "expo-router"
import { useState } from 'react'
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { fonts } from '../../../assets/theme';

const addSportEquipment = () => {

 

const router = useRouter();
const [type, setType] = useState(null);
const [isFocusType, setIsFocusType] = useState(false);

const [status, setStatus] = useState(null);
const [isFocusTypeStatus, setIsFocusTypeStatus] = useState(false);

const [txt_ekipmanTuru,setEkipmanTuru] = useState('');
const [txt_ekipmanDurumu,setEkipmanDurumu] = useState('');
const [txt_baslik,setBaslik] = useState('');
const [txt_aciklama,setAciklama] = useState('');
const [txt_fiyat,setFiyat] = useState('');
const [txt_imageUrl,setImageUrl] = useState('');


const brans = [
    { label: 'Basketbol', value: 'Basketbol' },
    { label: 'Tenis', value: 'Tenis' },
    { label: 'Futbol', value: 'Futbol' },
    { label: 'Hentbol', value: 'Hentbol' },
    { label: 'Yüzme', value: 'Yüzme' },
   
  ];
  const durum = [
    { label: 'Yıpranmış', value: 'Yıpranmış' },
    { label: 'İyi', value: 'İyi' },
    { label: 'Yeni Gibi', value: 'Yeni Gibi' },
    { label: 'Yeni', value: 'Yeni' },
  ];
const ekle = () => {
  var equipment = {
    title: txt_baslik,   
    category_id: 3,  
    description: txt_aciklama,                 
    price: txt_fiyat,
    image_url: txt_imageUrl,
    user_id: user.id,
  }
  axios.post('http://192.168.1.108:8000/products',equipment)
  .then((response) => {
    console.log(response);
 });

  
};

 const foto = async () =>{
  //await ensureDirExists();
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
  const uploadImage = await uploadToFirebase(image.uri,fileName,"v")
  console.log('uri'+image.uri)
  console.log('filename'+fileName)
  console.log('url '+uploadImage.downloadUrl)
  setImageUrl(uploadImage.downloadUrl)
  
}
const chatGPT = () =>{
  console.log('chatgpt')
        if(txt_baslik===''){
          console.log('Ilan basligini bos birakmayiniz !')
          ToastAndroid.show('Ilan basligini bos birakmayiniz !', ToastAndroid.LONG);
        
          }
          else{
            console.log('chatgpt')

          axios.get('http://192.168.1.114:5000/endpoint/'+txt_baslik)
          .then((response) => {
            const data = JSON.parse(response.data.data); // İlan açıklamasını çıkarmak için JSON.parse kullanabilirsiniz
            const aciklama = data.ilan_aciklamasi;
            setAciklama(aciklama)
            console.log(txt_baslik);
            console.log(aciklama);

          }).catch(error => {
            console.error('GET isteği sırasında bir hata oluştu:', error);
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
     
    <View style={{marginTop:80}}>
      
      <View style={{marginTop:40}}>
        <Dropdown
          style={[styles.dropdown, isFocusType && { borderColor: '#159C97'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={brans}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocusType ? 'Branş' : '...'}
          searchPlaceholder="Search..."
          value={type}
          onFocus={() => setIsFocusType(true)}
          onBlur={() => setIsFocusType(false)}
          onChange={item => {
            setType(item.value);
            setIsFocusType(false);
          }}
          
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
      </View>
      
    <View style={styles.container}>
    
      
      <TextInput
            style={styles.textInputStyle}
            placeholder="İlan Başlığı"
            placeholderTextColor="#000"
            onChangeText={(text) => setBaslik(text)}
            />
        <TextInput
        style={{height:100, ...styles.textInputStyle}}
        placeholder=" Açıklama"
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
    </View>
    </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
         
        fontSize: 25,
        color: '#3AB4BA',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 0, 
    },
    textHeaderStyle:{
      
      fontSize:25,
      marginLeft:0,
      marginTop:50,
      color:'white',
      alignSelf:'center'
      
    },
    dropdown: {
        height: 50,
        width: 330,
        marginLeft: 40,
        borderColor: '#8F8F8F',
        borderWidth: 2,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginTop:30,
        
        
      },
    textInputStyle:{
      borderColor: '#000',
      borderWidth: 2,
      borderColor: '#8F8F8F',
      borderRadius: 8,
      width: '80%',
      height: 50,
      fontSize: 16,
      opacity: 1,
      marginTop: 30,
      paddingLeft:10,
      
      
    },
    image:{
      width:220,
      height:100,
      marginLeft: 100
      
    },
    button:{
      marginTop:40,
      width:100,
      height:100,
    },
    dropDownStlye:{
        height: 40,
        width: 220
    },
    placeholderStyle: {
        fontSize: 16,
        
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
export default addSportEquipment