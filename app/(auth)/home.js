import { View, Text, StyleSheet, ScrollView,TouchableOpacity, Image, Pressable } from 'react-native';
import React, {useState, useEffect, useRef, createRef} from 'react';
import { useUser } from '@clerk/clerk-expo';
import { useFonts } from 'expo-font';
import { Link,router } from 'expo-router';
import axios from 'axios'
import { EvilIcons } from '@expo/vector-icons';
import { fonts } from '../../assets/theme';
import { SearchBar } from '@rneui/themed';


const Home = () => {
  const { user } = useUser();

  const [book, setBook] = useState([]);
  const [search1, setSearch1] = useState("");
  
  const BASE_URL = "http://192.168.1.112:8000"
  const fetchData = () => {
    axios.get(`${BASE_URL}/products:sort=product_id:desc`)
      .then((response) => {
        setBook(response.data.children);
      })
      .catch((error) => {
        console.error('Veri çekme hatası:', error);
      });
  };
  console.log("searchText---",search1)
  useEffect(() => {
    fetchData(); 
  }, []);


  const updateSearch = (search) => {
    
    setSearch1(search);
    console.log("typeofsearchText---",typeof search1)

  };
  
  const [category, setCategory] = useState([]);
  const fetchDataCategory = () => {
        axios.get(`${BASE_URL}/categories`)
          .then((response) => {
            setCategory(response.data.children);
            console.log(response.data.children)
          })
          .catch((error) => {
            console.error('Veri çekme hatası:', error);
          });
      };
    
      useEffect(() => {
        fetchDataCategory(); 
      }, []);

 
  const kisaText = (text,length) => {
    if (text.length > length) {
      return text.substring(0, length - 3) + '...';
    }
    return text;
  }
  const showAds = (category_id)=>{
    console.log(category_id)
    if(category_id==1){
      router.push("../screens/ads/kitapIlanlari")
    }
    else if(category_id==3){
      router.push("../screens/ads/sporIlanlari")
    }
    else if(category_id==2){
      router.push("../screens/ads/teknolojiIlanlari")
    }
    else if(category_id==4){
      router.push("../screens/ads/kitapIlanlari")
    }
    
  }
  const isDisabled = search1 === '';
  console.log(isDisabled)
  return (
    
    <View > 
      <View style={{flexDirection: 'row'}}>
          
        <Pressable 
          disabled={true}
          onPress={()=>{console.log('press')}}
          style={{marginTop:18}}
        >
          {isDisabled ? (
            <EvilIcons name="search" size={44} color="grey" />
          ) : (
            <Link 
              href={{
                pathname: "../screens/ads/searchAds",
                params: { search : search1 }
              }} 
            >
              <EvilIcons name="search" size={44} color="black" />
            </Link>
          )}
        </Pressable>
        <SearchBar
            placeholder="Ara..."
            onChangeText={updateSearch}
            value={search1}
            platform='ios'
            searchIcon={null}
            lightTheme={true}
            containerStyle={{backgroundColor: "#F2F2F2", width: '90%',alignSelf: 'flex-end'}}
            cancelButtonTitle='Vazgec'
          />
      </View>       
       

      <View>
        <View style={styles.containerButtons}>
        <ScrollView horizontal style={{marginTop:20}}>
          {category.map(item => {
            category_id = item.category_id;
            return(
            <View>
              <TouchableOpacity style={styles.buttonStyle} onPress={() => showAds(item.category_id)}>
                <Image style={{width:75,height:75}} source={{uri: item.image_url}} ></Image>
                <Text style={{fontSize:15,textTransform:'uppercase', textAlign:'center'}}>{item.name}</Text>
              </TouchableOpacity> 
            </View> 

            )
          })} 
          </ScrollView>
        </View>
      </View>

      <View  style={styles.containerAds} >
        <Text style={{fontSize:20,marginLeft:5}}>Son İlanlar</Text>
        <ScrollView   horizontal>
          {book.map(item => {
          const title = item.title || 'Başlık Yok';
          const author = item.author || 'Yazar Bilgisi Yok';
          const price = item.price || 'Fiyat Bilgisi Yok';
          const description = item.description || 'Açıklama yok';
          const image = item.image_url
          const product_id = item.product_id;
          const cat_id = item.category_id;
          return (
          <View key={item.id}   >
            <Link href={{
                pathname: "../screens/ads/urunDetay",
                params: { product_id : product_id,
                  cat_id: cat_id  
         }
              }} asChild>
              
              <TouchableOpacity style={{marginLeft:5, width:120, borderRightWidth:0.5}}>
               
                <Image source={{ uri: image}} style={styles.image} />
                <Text style={styles.textTitleStyle}>{kisaText(title,30)}</Text>
                
                <Text style={styles.textPriceStlye}>{price} TL</Text>
               
              </TouchableOpacity>
       
            </Link>
            
          </View>
        )

      })}
        </ScrollView>
        
      </View>

    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    
    paddingLeft:1,
    position:'absolute',
    marginTop:100,
    flexDirection: 'row',
    backgroundColor:'#D9D9D9',
  },
  containerButtons: {
    position:'absolute',
    flexDirection: 'row',
    backgroundColor:'#D9D9D9',
    marginLeft:20,
    marginTop: 40,
    height: 140,
    width: 375,
    position:'absolute',
    borderWidth: 0.5,
    borderColor: '#D9D9D9',
    borderRadius: 25,
    shadowColor:'black',
    shadowOffset: {
      width:10,
      height: 100
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 20
  },
  searchBar: {
    width:'370',
    height: 50,
    position: 'absolute',
    marginLeft:20,
    marginTop:20,
    
  },
  container1: {
    
    paddingLeft:10,
    paddingBottom: 0,
    flexDirection: 'row'
  },
  
  containerAds: {
    width: 368,
    position:'absolute',
    height: 330,
    marginLeft: 13,
    marginTop: 300,
    borderWidth: 0.5,
    borderRadius: 25,
    borderColor: '#D9D9D9',
    backgroundColor: '#D9D9D9',
    shadowColor:'black',
    shadowOffset: {
      width:10,
      height: 100
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 20
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  buttonStyle: {
    width: 82,
    height: 82,
    alignSelf:'center',
    marginLeft:3,
    marginRight:10,
    
    borderRadius: 25,
    textAlignVertical: 'center',
    textAlign: 'center',
    alignItems: 'center',
    lineHeight: 10,   
    
  },
  textStyle: {
    fontSize:20, 
    textAlign:'center',
    position: 'relative', 
    color: '#fff', 
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    
  
    
  },
  image:{
    
    width:90,
    height:90,
    marginLeft: 20,
    marginTop: 20,
    borderRadius:15
  },
  textTitleStyle: {
    fontSize:20, 
    borderRadius:25,
    marginLeft:20,
    marginTop:5,
    
    
  },
  textPriceStlye:{
    textAlign:'right',
    marginRight:5,
    marginTop:10,
    
    fontSize:15
  }
});