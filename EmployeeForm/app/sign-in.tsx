import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Button,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import * as Yup from "yup";
import { router } from "expo-router";

const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function SignInScreen() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
  <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : undefined}
  >
    <View style={styles.header}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#334155" />
      </Pressable>

      <View style={styles.iconContainer}>
        <Ionicons name="person-circle-outline" size={58} color="#2563EB" />
      </View>

      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>
        Sign in to continue to the employee portal
      </Text>
    </View>

    {/* rest unchanged */}

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={signInSchema}
          validateOnMount
          validateOnChange
          validateOnBlur
          onSubmit={(values, { resetForm, setSubmitting }) => {
            setSubmitting(true);

            setTimeout(() => {
              const message = `Welcome, ${values.email}`;

              if (Platform.OS === "web") {
                window.alert(`Sign In Successful\n\n${message}`);
                resetForm();
              } else {
                Alert.alert("Sign In Successful", message, [
                  {
                    text: "OK",
                    onPress: () => resetForm(),
                  },
                ]);
              }

              setSubmitting(false);
            }, 1000);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
            dirty,
            isSubmitting,
          }) => (
            <View style={styles.formCard}>
              <Text style={styles.label}>Email Address</Text>

              <View
                style={[
                  styles.inputContainer,
                  touched.email && errors.email
                    ? styles.inputContainerError
                    : null,
                  touched.email && !errors.email
                    ? styles.inputContainerSuccess
                    : null,
                ]}
              >
                <Ionicons
                  name="mail-outline"
                  size={21}
                  color="#64748B"
                  style={styles.inputIcon}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                />
              </View>

              {touched.email && errors.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}

              {touched.email && !errors.email && values.email.length > 0 ? (
                <Text style={styles.successText}>Email looks valid</Text>
              ) : null}

              <Text style={styles.label}>Password</Text>

              <View
                style={[
                  styles.inputContainer,
                  touched.password && errors.password
                    ? styles.inputContainerError
                    : null,
                  touched.password && !errors.password
                    ? styles.inputContainerSuccess
                    : null,
                ]}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={21}
                  color="#64748B"
                  style={styles.inputIcon}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                />

                <Pressable
                  onPress={() => setShowPassword((previous) => !previous)}
                  style={styles.eyeButton}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={22}
                    color="#64748B"
                  />
                </Pressable>
              </View>

              {touched.password && errors.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : null}

              {touched.password &&
              !errors.password &&
              values.password.length > 0 ? (
                <Text style={styles.successText}>Password length is valid</Text>
              ) : null}

              <Pressable style={styles.forgotButton}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </Pressable>

              <Pressable
                style={[
                  styles.signInButton,
                  !isValid || !dirty || isSubmitting
                    ? styles.signInButtonDisabled
                    : null,
                ]}
                disabled={!isValid || !dirty || isSubmitting}
                onPress={() => handleSubmit()}
              >
                {isSubmitting ? (
                  <View style={styles.loadingRow}>
                    <ActivityIndicator color="#FFFFFF" size="small" />
                    <Text style={styles.signInButtonText}>Signing In...</Text>
                  </View>
                ) : (
                  <Text style={styles.signInButtonText}>Sign In</Text>
                )}
              </Pressable>

              <Pressable style={styles.resetButton} onPress={() => {}}>
                <Text style={styles.resetButtonText}>
                  Form resets automatically after successful sign-in
                </Text>
              </Pressable>

              <Text style={styles.accountText}>
                Do not have an account?{" "}
                <Text style={styles.signUpText}>Sign Up</Text>
              </Text>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F7FB",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 22,
  },

  header: {
    alignItems: "center",
    marginBottom: 28,
  },

  backButton: {
  position: "absolute",
  top: 0,
  left: 0,
  padding: 8,
  zIndex: 1,
},
  iconContainer: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 21,
  },

  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 7,
    marginTop: 8,
  },

  inputContainer: {
    minHeight: 54,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 13,
  },

  inputContainerError: {
    borderColor: "#DC2626",
    backgroundColor: "#FEF2F2",
  },

  inputContainerSuccess: {
    borderColor: "#16A34A",
    backgroundColor: "#F0FDF4",
  },

  inputIcon: {
    marginRight: 9,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: "#0F172A",
    paddingVertical: 13,
  },

  eyeButton: {
    padding: 5,
  },

  errorText: {
    color: "#DC2626",
    fontSize: 12,
    marginTop: 5,
    marginBottom: 3,
  },

  successText: {
    color: "#16A34A",
    fontSize: 12,
    marginTop: 5,
    marginBottom: 3,
  },

  forgotButton: {
    alignSelf: "flex-end",
    marginTop: 12,
    marginBottom: 18,
  },

  forgotText: {
    color: "#2563EB",
    fontSize: 14,
    fontWeight: "600",
  },

  signInButton: {
    backgroundColor: "#2563EB",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
  },

  signInButtonDisabled: {
    backgroundColor: "#93C5FD",
  },

  signInButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  resetButton: {
    marginTop: 12,
    alignItems: "center",
  },

  resetButtonText: {
    fontSize: 12,
    color: "#64748B",
  },

  accountText: {
    textAlign: "center",
    marginTop: 18,
    fontSize: 14,
    color: "#64748B",
  },

  signUpText: {
    color: "#2563EB",
    fontWeight: "700",
  },
});
