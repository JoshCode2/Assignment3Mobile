import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

const SignUpSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Name is too short")
    .required("Full name is required"),

  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
});

export default function SignUpScreen() {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Create Account
      </Text>

      <Text style={styles.subtitle}>
        Sign up to continue
      </Text>


      <Formik
        initialValues={{
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}

        validationSchema={SignUpSchema}

        onSubmit={(values) => {
          Alert.alert(
            "Success",
            `Welcome ${values.fullName}!`
          );
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>

            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={values.fullName}
              onChangeText={handleChange("fullName")}
              onBlur={handleBlur("fullName")}
            />

            {touched.fullName && errors.fullName && (
              <Text style={styles.error}>
                {errors.fullName}
              </Text>
            )}


            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
            />

            {touched.email && errors.email && (
              <Text style={styles.error}>
                {errors.email}
              </Text>
            )}


            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
            />

            {touched.password && errors.password && (
              <Text style={styles.error}>
                {errors.password}
              </Text>
            )}


            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              value={values.confirmPassword}
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
            />

            {touched.confirmPassword &&
              errors.confirmPassword && (
              <Text style={styles.error}>
                {errors.confirmPassword}
              </Text>
            )}


            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.buttonText}>
                Sign Up
              </Text>
            </TouchableOpacity>

          </View>
        )}

      </Formik>

    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#ffffff",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    textAlign: "center",
    color: "gray",
    marginBottom: 30,
    fontSize: 16,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#4A90E2",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  error: {
    color: "red",
    fontSize: 13,
    marginBottom: 5,
  },

});