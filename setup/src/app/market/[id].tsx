import { View, Text, Alert } from 'react-native'

import { Cover } from '@/components/market/cover';

import { router, useLocalSearchParams } from 'expo-router'

import { Loading } from '@/components/loading';

import { api } from '@/services/api';
import { useEffect, useState } from 'react';

export default function Market() {

    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    
    const params = useLocalSearchParams<{id: string}>()

    async function fetchMarket(){
        try {
            const { data } = await api.get(`/markets/${params.id}`)
           setData(data)
            setIsLoading(false)
        } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Não foi possível carregar os dados.", [
                {
                    text: "Ok", onPress: () => router.back()
                }
            ])
        }
    }


    useEffect(() => {
        fetchMarket()
    }, [params.id])

    if(isLoading){
        return <Loading />
    }
    return(
        <View style={{flex: 1}}>
            <Cover uri={data.cover} />
        </View>
    )
}