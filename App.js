import { StatusBar } from 'expo-status-bar';
import { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView ,{Marker} from 'react-native-maps';
import * as Location from "expo-location";


export default function App() {
  const [mapRegion,setMapRegion]= useState({
    latitude:37.78825,
    longitude:-122.4324,
    latitudeDelta:0.0922,
    longitudeDelta:0.0421,
  })


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
    latitudeDelta:0.0922,
    longitudeDelta:0.0421,
    })
  }

  useEffect(()=>{
    userLocation()
  },[])
  return (
    <View style={styles.container}>
      <MapView region={mapRegion} style={styles.map} >
        <MapView.Marker
        coordinate={mapRegion}
        title="masjid mohammed 6"
        description="its the big masjid in morocco so yah!"
        />
        <View style={styles.marker}></View>
      </MapView>
      <StatusBar style="auto" />
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
  map:{
    width:"100%",
    height:"100%"
  },
  marker:{
    width:"20px",
    height:"20px",
    backgroundColor:"red",
  }
});
