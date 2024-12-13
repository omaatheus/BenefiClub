import { Steps } from '@/components/steps'
import { Welcome } from '@/components/welcome'
import { View, Text, StyleSheet } from 'react-native'

export default function Index() {
    return(

        <View style={styles.container}>
            <Welcome />
            <Steps />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, padding: 40, gap: 40
    }
})
