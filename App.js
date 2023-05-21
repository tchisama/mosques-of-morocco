import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView ,{Marker} from 'react-native-maps';

export default function App() {
  const [mapRegion,setMapRegion]= useState({
    latitude:37.78825,
    longitude:-122.4324,
    latitudeDelta:0.0922,
    longitudeDelta:0.0421,
  })
  return (
    <View style={styles.container}>
      <MapView region={mapRegion} style={styles.map} >
        <Marker
        coordinate={mapRegion}
        title="masjid mohammed 6"
        description="its the big masjid in morocco so yah!"
        />
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
  }
});
