import { View, Text, FlatList,StyleSheet,TextInput,Button,Image } from 'react-native'
import React,{ useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { useFonts } from 'expo-font';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

const addEarphone = () => {
    const [txt_aciklama,setAciklama] = useState('');
    const [txt_fiyat,setFiyat] = useState('');
    const [txt_baslik,setBaslik] = useState('');
    const [status, setStatus] = useState(null);
    const [isFocusTypeStatus, setIsFocusTypeStatus] = useState(false);
    const [image_url,setImageUrl] = useState('')

    const urun_marka = [
        { label: 'Asus', value: 'Asus' },
        { label: 'Apple', value: 'Apple' },
        { label: 'Dell', value: 'Dell' },
        { label: 'HP', value: 'HP' },
        { label: 'Lenovo', value: 'Lenovo' },
        { label: 'Monster', value: 'Monster' },
        { label: 'Samsung', value: 'Samsung' },
      ];
      const durum = [
        { label: 'Yıpranmış', value: 'Yıpranmış' },
        { label: 'İyi', value: 'İyi' },
        { label: 'Yeni Gibi', value: 'Yeni Gibi' },
        { label: 'Yeni', value: 'Yeni' },
      ];

    
      const ekle = () => {
        var book = {
          title: txt_baslik, 
          category_id: 2,      
          description: txt_aciklama,                 
          price: txt_fiyat,
          image_url : image_url,
          user_id: user.id,
        
        }
        console.log(image_url)
        axios.post('http://192.168.1.114:8000/products',book)
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
      
      <View style={styles.container}>
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
            style={styles.textInputStyle}
            placeholder="İlan Başlığı"
            placeholderTextColor="#000"
            onChangeText={(text) => setBaslik(text)}
            />
          <TextInput
          multiline={true}
          style={{height:100, ...styles.textInputStyle}}
          value={txt_aciklama}
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
          <Button title='Ekle' onPress={ekle}/> 
          <Button title='foto' onPress={foto}/>
      </View>
    </View>
    </View>
  )
}

export default addEarphone
const styles = StyleSheet.create({
      container: {
                
        fontSize: 25,
        color: '#8F8F8F',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: 70, 
        marginLeft:30
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
        marginLeft: 0,
        borderColor: '#8F8F8F',
        borderWidth: 3,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginTop:30
        
      },
    textInputStyle:{
      borderColor: '#000',
      borderWidth: 3,
      borderColor: '#8F8F8F',
      borderRadius: 8,
      width: '87%',
      height: 50,
      fontSize: 16,
      opacity: 1,
      marginTop: 30,
      paddingHorizontal:10,
      
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
      alignSelf:'flex-end',
      marginRight:70
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