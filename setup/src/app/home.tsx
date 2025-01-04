import { View, Text, StyleSheet, Alert } from "react-native";

import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { Categories, CategoriesProps } from "@/components/categories";

export default function Home(){

    const [categories, setCategories] = useState<CategoriesProps>([])
    const [category, setCategory] = useState("")

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

    useEffect(() => {
        fetchCategories()
    }, [])

    return(
        <View style={styles.container}>
            <Categories data={categories} selected={category} onSelect={setCategory}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
