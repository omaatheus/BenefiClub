import {Image, Text, View} from 'react-native'
import { styles } from './styles'

const img = require('@/assets/logo.png')

export function Welcome() {
    return (
        <View>
            <Image source={img} style={styles.logo} />

            <Text style={styles.title}>Boas Vindas ao BenefiClub!</Text>
            <Text style={styles.subtitle}>Tenha cupons de vantagem para usar em seus estabelecimentos favoritos.</Text>
        </View>
        
    )
}