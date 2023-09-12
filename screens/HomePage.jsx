import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet,TextInput, Text, View, Touchable, TouchableOpacity, ScrollView, Image } from 'react-native';
import MapView , {Callout, Marker}from 'react-native-maps';
import * as Location from "expo-location";
import  Icon  from "@expo/vector-icons/Ionicons"
import BottomCard from '../components/BottomCard';
import { mapTheme , mosques } from '../data';


export default function HomePage({navigation}) {
  const [mapRegion,setMapRegion]= useState({
    latitude:37.78825,
    longitude:-122.4324,
    latitudeDelta:2,
    longitudeDelta:2,
  })



  const [friday,setFriday]=useState(false);
  const [women,setWomen]=useState(false);
  const [bathrooms,setBathrooms]=useState(false);

  const [selectedMosque,setSelectedMosque]=useState(null);



  const [openSearch,setOpenSearch]=useState(false)
  const [search,setSearch]=useState("")
  const _map = useRef(null);
  const [filteredMosquesState,SetFilteredMosquesState]=useState(mosques)

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
    latitudeDelta:0.045,
    longitudeDelta:0.045,
    })
  }




  const GoTo = (coordinate)=>{
    _map.current.animateToRegion(
      {
        ...coordinate,
        latitudeDelta:0.018,
        longitudeDelta:0.018,
      }
    )
  }

  const gohome=()=>{
    GoTo(mapRegion)
  }


  useEffect(()=>{
    userLocation()
  },[])


  useEffect(()=>{
    let final = mosques.filter(m=>m.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    if (friday) {
      final= final.filter(m=>m.friday)
    }
    if (women) {
      final=final.filter(m=>m.women)
    }
    if (bathrooms) {
      final=final.filter(m=>m.bathrooms)
    }
    SetFilteredMosquesState(final)
    console.log("hi")
    if(final&&search){
      setSelectedMosque(final[0].id)
      GoTo(final[0].location)
    }
  },[search,bathrooms,women,friday])
  return (
    <View  className="flex-1 bg-blue-200">
      <View className="absolute top-10  p-4 z-10 w-full flex-row justify-between">

        {
          !openSearch &&
        <TouchableOpacity  onPress={()=>setOpenSearch(p=>!p)} className=" t.shadow2xl  w-10 h-10 mr-2 justify-center items-center rounded-full bg-[#606C38] ">
          <Icon name={"search"} size={22} color={"#fff"}></Icon>
        </TouchableOpacity>
        }

        { openSearch &&
        <View style={{ elevation:4 }} className="flex-row flex-1 bg-white  t.shadow3xl  items-center  rounded-full ">
          <TouchableOpacity onPress={()=>{setOpenSearch(p=>!p);setSearch("")}} className=" w-10 h-10 bg-[#606C38] justify-center mr-2 items-center rounded-full ">
            <Icon name={"arrow-back"} size={22} color={"#fff"}></Icon>
          </TouchableOpacity>
          <TextInput value={search} onChangeText={setSearch} placeholder='ابحث عن مسجد' className="text-black  flex-1 h-full  pr-4  rounded-full "></TextInput>
        </View>
        }
        <TouchableOpacity className=" w-10 h-10 ml-2 justify-center items-center t.shadow2xl  rounded-full bg-[#606C38] ">
          <Icon name="menu" size={22} color={"#fff"}></Icon>
        </TouchableOpacity>
      </View>
        {
          openSearch&&

      <ScrollView horizontal  className="absolute left-0 top-24   w-full py-2 flex-row  z-10">
        <View className="w-3"></View>
        <TouchableOpacity onPress={()=>setFriday(p=>!p)} className=" mx-1 p-2 w-fit justify-center flex-row items-center rounded-full bg-[#545c39ee] ">
            <Text className="text-white px-2">صلاة الجمعة</Text>
            <Icon name={friday?"checkmark-circle-sharp":"ellipse-outline"} size={20} color={"#fff"}></Icon>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setWomen(p=>!p)} className=" mx-1 p-2 w-fit justify-center flex-row items-center rounded-full bg-[#545c39ee] ">
            <Text className="text-white px-2">مسجد نساء</Text>
            <Icon name={women?"checkmark-circle-sharp":"ellipse-outline"} size={20} color={"#fff"}></Icon>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setBathrooms(p=>!p)} className=" mx-1 p-2 w-fit justify-center flex-row items-center rounded-full bg-[#545c39ee] ">
            <Text className="text-white px-2">دورات المياه</Text>
            <Icon name={bathrooms?"checkmark-circle-sharp":"ellipse-outline"} size={20} color={"#fff"}></Icon>
        </TouchableOpacity>
      </ScrollView>

        }

        <TouchableOpacity  onPress={()=>gohome()} style={{bottom:(openSearch?150:100)}} className={` absolute z-10  right-2 t.shadow2xl  w-10 h-10 mr-2 justify-center items-center rounded-full bg-[#606c38]  border border-white`}>
          <Icon name={"locate-outline"} size={25} color={"#e9f1ce"}></Icon>
        </TouchableOpacity>

        {
          selectedMosque!=null &&
          <TouchableOpacity   style={{bottom:(openSearch?194:145)}} className={` absolute z-10  right-2 t.shadow2xl  w-10 h-10 mr-2 justify-center items-center rounded-full bg-[#606c38]  border border-white`}>
            <Icon name={"navigate"} size={22} color={"#e9f1ce"}></Icon>
          </TouchableOpacity>
        }

      
      <MapView onPress={()=>setSelectedMosque(null)} ref={_map} customMapStyle={mapTheme} region={mapRegion}  className="flex-1 w-full" >
        

        {/* <MapViewDirections
            origin={{
              latitude:37.78825,
              longitude:-122.4324,
              latitudeDelta:0.0922,
              longitudeDelta:0.0421,
            }}
            destination={mapRegion}
            apikey={}
        ></MapViewDirections> */}

        {
          filteredMosquesState.map((m,key)=>{
            return (
              <Marker
                key={key}
                coordinate={m.location}
                title={m.name}
                onPress={()=>setSelectedMosque(m.id)}
              >
                {
                    selectedMosque==m.id?
                  <Image className="w-[35px] h-[42px] scale-110 -translate-y-1"  source={require("../assets/markerActive.png")}/>:
                  <Image className="w-[35px] h-[42px]"  source={require("../assets/marker.png")}/>
                }
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

        <Marker
          coordinate={mapRegion}
          title="Your location"
          className="z-10"
        >
          <Image className="w-[35px] h-[42px] " source={require("../assets/UserMarker.png")}/>
        </Marker>


      </MapView>
      <StatusBar style="dark" />
      {
        !openSearch &&
        <BottomCard/>
      }


      {
        openSearch &&

        <View  style={{ elevation:4}} className="  absolute bottom-0 w-full pt-1 bg-white border-t border-[#3333]">
          <View className="flex-row justify-between px-2 items-center">

          <Text className="py-2 text-2xl font-semibold text-[#606c38]">{
          filteredMosquesState.length>2?
          filteredMosquesState.length +" مساجد":
          filteredMosquesState.length==2?
          "مسجدين":
          filteredMosquesState.length==1?
          "مسجد واحد":"لم يتم العثور على اي مسجد"

          } </Text>
                  {selectedMosque!=null &&
              <View >
                <TouchableOpacity onPress={()=>navigation.navigate("Details")} className="p-3 flex-row-reverse items-center py-1 bg-[#606c3822] rounded-lg text-lg">
                  <Text className="text-sm ml-2">
                    {mosques.filter(m=>m.id==selectedMosque)[0]?.name}
                  </Text>
                  <Icon name="arrow-back"></Icon>
                </TouchableOpacity>
              </View>
              }
          </View>

        <ScrollView  horizontal className="w-full ">
          {
            filteredMosquesState.map((m,key)=>(
              <TouchableOpacity key={key} onPress={()=>{GoTo(m.location);setSelectedMosque(m.id)}} >
                <View  style={{ elevation:m.id==selectedMosque?6:3,top:m.id==selectedMosque?-6:0}} className="w-fit t.shadow2xl border-red-800 relative bg-[#eff1e6] m-2 rounded-lg overflow-hidden mx-1">
                  <Image className="h-[80px] object-contain w-[130px] " source={{uri:m.img}}/>
                  <View className=" absolute top-[45px] left-1 bg-[#0006] rounded-md">
                    <Text numberOfLines={1} className="px-1 text-white max-w-[140px] ">{m.name}</Text>
                    <Text numberOfLines={1} className="px-1 text-white max-w-[140px] text-xs  ">{m.name}</Text>
                  </View>
                  {/* <View className="flex-row p-1 justify-end">
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
  )
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