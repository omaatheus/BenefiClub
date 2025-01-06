import { Button } from '@/components/button'
import { Steps } from '@/components/steps'
import { Welcome } from '@/components/welcome'
import { router } from 'expo-router'
import { View, Text, StyleSheet, StatusBar } from 'react-native'

export default function Index() {
    return(

        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Welcome />
            <Steps />

            <Button onPress={() => router.navigate("./home")}>
                <Button.Title>Começar</Button.Title>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, padding: 40, gap: 40
    }
})
