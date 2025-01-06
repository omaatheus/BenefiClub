import { View, Text, StyleSheet, Alert } from "react-native";
import MapView, { Callout, Marker } from 'react-native-maps'
import { colors, fontFamily } from "@/styles/theme";

import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { Categories, CategoriesProps } from "@/components/categories";
import { PlaceProps } from "@/components/place";
import { Places } from "@/components/places";
import * as Location from 'expo-location';
import { router } from "expo-router";

type MarketsProps = PlaceProps & {
    latitude: number,
    longitude: number
}

const currentLocation = {
    latitude: -23.561187293883442,
    longitude: -46.656451388116494,
}

export default function Home(){

    const [categories, setCategories] = useState<CategoriesProps>([])
    const [category, setCategory] = useState("")
    const [markets, setMarkets] = useState<MarketsProps[]>([])

    async function fetchCategories() {
        try {
            
            const { data } = await api.get("/categories")

            setCategories(data);
            setCategory(data[0].id)

        } catch (error) {
            console.log(error);
            Alert.alert("Categorias", "Não foi possível carregar as categorias.")
        }
    }

    async function fetchMarkets(){
        try {

            if(!category){
                return 
            }

            
            const {data} = await api.get('/markets/category/' + category) 

            setMarkets(data)
            
        } catch (error) {
            console.log(error);
            Alert.alert("Estabelecimentos", "Não foi possível carregar os estabelecimentos.")
            
        }
    }

    async function getCurrentLocation(){
        try {
            let { granted } = await Location.requestForegroundPermissionsAsync()

            if(granted){
               const location = await Location.getCurrentPositionAsync({})

               console.log(location);
               
            }

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])
    useEffect(() => {
        fetchMarkets()
    }, [category])

    return(
        <View style={styles.container}>
            <Categories data={categories} selected={category} onSelect={setCategory}/>
            <MapView 
            style={styles.mapview}
            initialRegion={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
            >
                <Marker 
                identifier="current"
                coordinate={{
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude
                }}
                image={require("@/assets/location.png")}
                />

                {
                    markets.map((item) => (
                        <Marker 
                        key={item.id}
                        identifier={item.id}
                        coordinate={{
                            latitude: item.latitude,
                            longitude: item.longitude,
                        }}
                        image={require('@/assets/pin.png')}
                        >
                            <Callout onPress={() => router.navigate(`/market/${item.id}`)}>
                                <View>
                                    <Text style={styles.nameCallout}>
                                        {item.name}
                                    </Text>
                                    <Text style={styles.addresCallout}>
                                        {item.address}
                                    </Text>
                                </View>
                            </Callout>
                        </Marker>
                    ))}
            </MapView>
            <Places data={markets} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#CECECE",
    },
    mapview: {
        flex: 1
    },
    nameCallout: {
        fontSize: 14,
        color: colors.gray[600],
        fontFamily: fontFamily.medium
    },
    addresCallout: {
        fontSize: 12,
        color: colors.gray[600],
        fontFamily: fontFamily.regular
    },
})
