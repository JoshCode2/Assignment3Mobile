import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* Home screen */}
      <Stack.Screen name="index" options={{ headerShown: false }} />

      {/* Sign Up screen */}
      <Stack.Screen
        name="SignUp"
        options={{
          title: "Create Account",
        }}
      />
    </Stack>
  );
}
