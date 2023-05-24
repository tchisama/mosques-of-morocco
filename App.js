import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
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
  const _map = useRef(null);


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




  const GoTo = (coordinate)=>{
    _map.current.animateToRegion(
      {
        ...coordinate,
        latitudeDelta:0.005,
        longitudeDelta:0.005,
      }
    )
  }




  useEffect(()=>{
    userLocation()
  },[])
  useEffect(()=>{
    console.log(search)
  },[search])
  return (
    <View  className="flex-1 bg-blue-200">
      <View className="absolute top-10  p-4 z-10 w-full flex-row justify-between">

        {
          !openSearch &&
        <TouchableOpacity  onPress={()=>setOpenSearch(p=>!p)} className=" t.shadow2xl  w-10 h-10 mr-2 justify-center items-center rounded-full bg-[#e9f1ce] border border-white">
          <Icon name={"search"} size={25} color={"#606C38"}></Icon>
        </TouchableOpacity>
        }

        { openSearch &&
        <View className="flex-row flex-1 bg-[#e9f1ce] border t.shadow2xl border-white items-center px-2 rounded-full ">
          <TouchableOpacity onPress={()=>{setOpenSearch(p=>!p);setSearch("")}} className=" justify-center mr-2 items-center rounded-full ">
            <Icon name={"arrow-back"} size={25} color={"#606C38"}></Icon>
          </TouchableOpacity>
          <TextInput value={search} onChangeText={setSearch} placeholder='search a mosque' className="flex-1 h-full  pr-4  rounded-full "></TextInput>
        </View>
        }
        <TouchableOpacity className=" w-10 h-10 ml-2 justify-center items-center t.shadow2xl  rounded-full bg-[#e9f1ce] border border-white">
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



      <MapView ref={_map} customMapStyle={mapTheme} region={mapRegion}  className="flex-1 w-full" >
        <Marker
          coordinate={mapRegion}
          title="Your location"
        >
          <Image className="w-[35px] h-[42px]" source={require("./assets/UserMarker.png")}/>
        </Marker>
        

        {
          mosques.filter(m=>m.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())).map((m,key)=>{
            return (
              <Marker
                key={key}
                coordinate={m.location}
                title={m.name}
              >
                <Image className="w-[35px] h-[42px]" source={require("./assets/marker.png")}/>
                <Callout className="h-fit w-[200px] rounded-xl">
                    <Text className="text-lg">{m.name}</Text>
                    <Text className="py-1 text-xs">{m.name}</Text>
                    {/* <View className="flex-row w-36 py-1">
                        <TouchableOpacity className="  mr-1 p-1 px-3 w-fit justify-center items-center rounded-full bg-[#545c3999] ">
                          <Text className="text-white">open</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="  p-1 px-3 w-fit justify-center items-center rounded-full bg-[#545c3999] ">
                          <Text className="text-white">see road</Text>
                        </TouchableOpacity>
                    </View> */}
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
        <View className="  absolute bottom-0 w-full">
        <ScrollView  horizontal className="w-full ">
          {
            mosques.filter(m=>m.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())).map((m,key)=>(
              <TouchableOpacity onPress={()=>GoTo(m.location)} >
                <View key={key} style={{ elevation:2 }} className="w-fit t.shadow2xl  bg-[#eff1e6] m-2 rounded-lg overflow-hidden mx-1">
                  <Image className="h-[100px] object-contain w-[200px] " source={{uri:m.img}}/>
                  <View className=" absolute top-[65px] left-1 bg-[#0004] rounded-md">
                    <Text numberOfLines={1} className="px-1 text-white max-w-[140px] ">{m.name}</Text>
                    <Text numberOfLines={1} className="px-1 text-white max-w-[140px] text-xs  ">{m.name}</Text>
                  </View>
                  {/* <View className="flex-row p-1 justify-end">
                    <TouchableOpacity className="  mr-1 p-1 px-3 w-fit justify-center items-center rounded-full bg-[#545c3999] ">
                      <Text className="text-white">Show Road</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="  mr-1 p-1 px-3 w-fit justify-center items-center rounded-full bg-[#545c3999] ">
                      <Text className="text-white">Open</Text>
                    </TouchableOpacity>
                  </View> */}
                </View>
              </TouchableOpacity>
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