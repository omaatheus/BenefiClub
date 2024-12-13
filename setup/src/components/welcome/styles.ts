import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const styles = StyleSheet.create({
    logo: {
        width: 48,
        height: 48,
        marginTop: 24,
        marginBottom: 28
    },
    title: {
        fontSize: 24,
        fontFamily: fontFamily.bold,
        color: colors.gray[600]
    },
    subtitle: {
        fontSize: 18,
        fontFamily: fontFamily.regular,
        color: colors.gray[500],
        marginTop: 12 
    }
})