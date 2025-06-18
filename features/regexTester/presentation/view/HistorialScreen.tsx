import { Pressable } from "react-native";
import { View, Text, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router';



export const HistorialScreen = () => {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Historial</Text>
            <Pressable style={styles.button} onPress={() => router.back()} >
                <Text style={styles.buttonText}>Regresar:</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        marginTop: 50,
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    countText: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
        color: "blue",
    },
    button: {
        alignItems: "center",
        backgroundColor: "#007AFF",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },


})

export default HistorialScreen;