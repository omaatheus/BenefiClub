import { View, Text } from "react-native";
import { styles } from "./style";
import { colors } from "@/styles/colors";
import { IconProps } from "@tabler/icons-react-native";

type StepProps = {
    title: string,
    description: string,
    icon: React.ComponentType<IconProps>
}

export function Step({title, description, icon: Icon}: StepProps){
    return(
        <View style={styles.container}>
            {Icon && <Icon size={32} color={colors.red.base} />}

            <View style={styles.details}>
                <Text style={styles.title}>{title}</Text>

                <Text style={styles.description}>{description}</Text>
            </View>
        </View>
    )
}