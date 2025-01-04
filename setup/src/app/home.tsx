import { View, Text, StyleSheet, Alert } from "react-native";

import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { Categories, CategoriesProps } from "@/components/categories";
import { PlaceProps } from "@/components/place";
import { Places } from "@/components/places";

type MarketsProps = PlaceProps & {

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

    useEffect(() => {
        fetchCategories()
    }, [])
    useEffect(() => {
        fetchMarkets()
    }, [category])

    return(
        <View style={styles.container}>
            <Categories data={categories} selected={category} onSelect={setCategory}/>
            <Places data={markets} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#CECECE",
    }
})
