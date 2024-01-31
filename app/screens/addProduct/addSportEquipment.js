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
    price: txt_fiyat
  }
  axios.post('http://192.168.1.108:8000/products',equipment)
  .then((response) => {
    console.log(response);
 });

  /*if((/\d/.test(txt_yazarAdi))){
    Alert.alert('Uyarı', "yazar ismi sadece karakterlerden oluşmalı");
  }
  if(!(/\d/.test(txt_fiyat))){
    Alert.alert(s'Uyarı', "yazar ismi sadece karakterlerden oluşmalı");
  }*/
  
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
        style={styles.textInputStyle}
        placeholder=" Açıklama"
        placeholderTextColor="#000"
        onChangeText={(text) => setAciklama(text)}
        />
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
      fontFamily:fonts.semiBold,
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
        fontFamily:fonts.semiBold
        
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
      
      fontFamily:fonts.mediumItalic
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
        fontFamily:fonts.mediumItalic
      },
      selectedTextStyle: {
        fontSize: 16,
        fontFamily:fonts.mediumItalic
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
        fontFamily:fonts.mediumItalic
      },

})
export default addSportEquipment