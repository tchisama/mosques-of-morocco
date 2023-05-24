import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet,TextInput, Text, View, Touchable, TouchableOpacity, ScrollView, Image } from 'react-native';
import MapView , {Callout, Marker}from 'react-native-maps';
import * as Location from "expo-location";
import  Icon  from "@expo/vector-icons/Ionicons"
import WebView from 'react-native-webview';

const mapTheme = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"},{"visibility":"on"},{"saturation":0}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#596549"},{"visibility":"on"},{"saturation":0}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#bdbf5f"},{"visibility":"on"},{"saturation":0}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#818a60"},{"visibility":"on"},{"saturation":0}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#606c38"},{"visibility":"on"},{"saturation":0}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#596549"},{"visibility":"on"},{"saturation":0}]},{"featureType":"water","elementType":"","stylers":[{"color":"#a2b389"},{"visibility":"on"},{"saturation":0}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"on"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"}]}]



const mosques = [
  {
    location:{
      latitude:31.62390501675665,
      longitude: -7.993639462879545,
      latitudeDelta:0.0922,
      longitudeDelta:0.0421,
    },
    name:"Koutoubia",
    img:"https://lh5.googleusercontent.com/p/AF1QipON_zhK7b4-bNGFN7rk1LLqsHxu025LWgidoTIN=w408-h244-k-no"
  },
  {
    location:{
      latitude:31.632214671871687, 
      longitude: -7.987329105208918,
      latitudeDelta:0.0922,
      longitudeDelta:0.0421,
    },
    name:"Ben Youssef Mosque",
    img:"https://lh5.googleusercontent.com/p/AF1QipMb84JafmzeAQwsSsBt6Xp_9k1DvM3WsCwBa_Mj=w408-h725-k-no"
  },
  {
    location:{
      latitude:31.617464619926125, 
      longitude: -7.989252266190481,
      latitudeDelta:0.0922,
      longitudeDelta:0.0421,
    },
    name:"Moulay el Yazid Mosque",
    img:"https://lh5.googleusercontent.com/p/AF1QipONLhG9qQEOrGFza0NNuKtnqKE0rt0QIM5vs_Hp=w408-h306-k-no"
  },
]







 function App() {
  const [mapRegion,setMapRegion]= useState({
    latitude:37.78825,
    longitude:-122.4324,
    latitudeDelta:0.0922,
    longitudeDelta:0.0421,
  })


  const [openSearch,setOpenSearch]=useState(false)
  const [search,setSearch]=useState("")


  const userLocation = async ()=>{
    let {status } = await Location.requestForegroundPermissionsAsync();
    if(status!== "granted"){
      setErrorMsg("Permission to access location was denied")
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy : true
    })
    setMapRegion({
    latitude:location.coords.latitude,
    longitude:location.coords.longitude,
    latitudeDelta:0.025,
    longitudeDelta:0.025,
    })
  }

  useEffect(()=>{
    userLocation()
  },[])
  return (
    <View  className="flex-1 bg-blue-200">
      <View className="absolute top-10  p-4 z-10 w-full flex-row justify-between">

        {
          !openSearch &&
        <TouchableOpacity onPress={()=>setOpenSearch(p=>!p)} className=" w-10 h-10 mr-2 justify-center items-center rounded-full bg-[#e9f1ce] border border-white">
          <Icon name={"search"} size={25} color={"#606C38"}></Icon>
        </TouchableOpacity>
        }

        { openSearch &&
        <View className="flex-row flex-1 bg-[#e9f1ce] border border-white items-center px-2 rounded-full ">
          <TouchableOpacity onPress={()=>setOpenSearch(p=>!p)} className=" justify-center mr-2 items-center rounded-full ">
            <Icon name={"arrow-back"} size={25} color={"#606C38"}></Icon>
          </TouchableOpacity>
          <TextInput placeholder='search a mosque' className="flex-1 h-full  pr-4  rounded-full "></TextInput>
        </View>
        }
        <TouchableOpacity className=" w-10 h-10 ml-2 justify-center items-center rounded-full bg-[#e9f1ce] border border-white">
          <Icon name="menu" size={25} color={"#606C38"}></Icon>
        </TouchableOpacity>
      </View>
        {
          openSearch&&

      <ScrollView horizontal className="absolute left-0 top-24   w-full py-2 flex-row  z-10">
        <View className="w-3"></View>
        <TouchableOpacity className=" mx-1 p-2 px-4 w-fit justify-center items-center rounded-full bg-[#545c3999] ">
            <Text className="text-white">hello world</Text>
        </TouchableOpacity>
        <TouchableOpacity className=" mx-1 p-2 px-4 w-fit justify-center items-center rounded-full bg-[#545c3999] ">
            <Text className="text-white">hello world</Text>
        </TouchableOpacity>
        <TouchableOpacity className=" mx-1 p-2 px-4 w-fit justify-center items-center rounded-full bg-[#545c3999] ">
            <Text className="text-white">hello world</Text>
        </TouchableOpacity>
        <TouchableOpacity className=" mx-1 p-2 px-4 w-fit justify-center items-center rounded-full bg-[#545c3999] ">
            <Text className="text-white">hello world</Text>
        </TouchableOpacity>
        <View className="w-3"></View>
      </ScrollView>

        }



      <MapView customMapStyle={mapTheme} region={mapRegion}  className="flex-1 w-full" >
        <Marker
          coordinate={mapRegion}
          title="Your location"
        >
          <Image className="w-[35px] h-[42px]" source={require("./assets/UserMarker.png")}/>
        </Marker>
        

        {
          mosques.map(m=>{
            return (
              <Marker
                coordinate={m.location}
                title={m.name}
              >
                <Image className="w-[35px] h-[42px]" source={require("./assets/marker.png")}/>
                <Callout className="h-fit w-[200px]">
                    <Text className="text-lg">{m.name}</Text>
                    <Text className="py-1 text-xs">{m.name}</Text>
                    <View className="flex-row w-36 py-1">
                        <TouchableOpacity className="  mr-1 p-1 px-3 w-fit justify-center items-center rounded-full bg-[#545c3999] ">
                          <Text className="text-white">open</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="  p-1 px-3 w-fit justify-center items-center rounded-full bg-[#545c3999] ">
                          <Text className="text-white">see road</Text>
                        </TouchableOpacity>
                    </View>
                </Callout>
              </Marker>
            )
          })
        }



      </MapView>
      <StatusBar style="light" />
      {
        !openSearch &&
      <View className="absolute w-full bottom-0 p-2">
        <View className="bg-[#e9f1ce] border border-white flex-row justify-between p-3  rounded-2xl  ">
          <View>
            <Text className="text-3xl text-[#606C38] font-semibold">03:15</Text>
            <Text className="text-lg text-[#606C38] font-semibold">00:15:20</Text>
          </View>
          <View>
            <Text className="text-3xl text-[#606C38] font-semibold">صلاة العصر</Text>
            <Text className="text-lg text-[#606C38] font-semibold">باق على الاذان</Text>
          </View>
        </View>
      </View>
      }


      {
        openSearch &&
        <View className=" h-40 absolute bottom-0 pb-2 w-full">
        <ScrollView  horizontal className="w-full ">
          {
            mosques.map((m,key)=>(
              <View key={key} className="p-1 border border-white bg-[#eff1e6] rounded-xl mx-1">
                <Image className="h-[120px] mb-1 rounded-lg w-[150px] " source={{uri:m.img}}/>
                <Text className="px-1 h-[16px] max-w-[150px] text-[#606C38]">{m.name}</Text>
              </View>
            ))

          }


        </ScrollView>
        </View>
      }



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    width:"100px",
    height:"20px"
  },
  marker:{
    width:"20px",
    height:"20px",
    backgroundColor:"red",
  }
});
export default App;