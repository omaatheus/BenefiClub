import { View, Text, Alert, Modal } from 'react-native'

import { Cover } from '@/components/market/cover';

import { router, useLocalSearchParams, Redirect } from 'expo-router'

import { Loading } from '@/components/loading';

import { PropsDetails, Details } from '@/components/market/details';

import { Coupon } from '@/components/market/coupon';

import { api } from '@/services/api';
import { useEffect, useState } from 'react';
import { Button } from '@/components/button';



type DataProps = PropsDetails & {
    cover: string
}

export default function Market() {

    const [data, setData] = useState<DataProps>()
    const [isLoading, setIsLoading] = useState(true)
    const [coupon, setCoupon] = useState<string | null>(null)
    const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false)
    
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

    function handleOpenCamera(){
        try {
            setIsVisibleCameraModal(true)
        } catch (error) {
            console.error(error);
            
        }
    }


    useEffect(() => {
        fetchMarket()
    }, [params.id])

    if(isLoading){
        return <Loading />
    }

    if(!data){
        return <Redirect href="/home" />
    }
    return(
        <View style={{flex: 1}}>
            <Cover uri={data.cover} />

            <Details data={data} />
            { coupon &&  <Coupon code={coupon} />}
            <View style={{padding: 32}}>
                <Button onPress={handleOpenCamera}>
                    <Button.Title>Ler QR Code</Button.Title>
                </Button>
            </View>

            <Modal style={{flex: 1}} visible={isVisibleCameraModal}>
                <View style={{flex: 1, justifyContent: "center"}}>
                <Button onPress={() => setIsVisibleCameraModal(false)}>
                    <Button.Title>
                        Retornar
                    </Button.Title>
                </Button>
                </View>
            </Modal>
        </View>
    )
}