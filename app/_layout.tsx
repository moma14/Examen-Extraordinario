import { Stack } from "expo-router";
import { LogBox } from "react-native";

export default function Layout() {
    LogBox.ignoreLogs([
        'Internal React error: Expected static flag was missing'
    ]);
    return (
        <Stack>
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        </Stack>
    )
}