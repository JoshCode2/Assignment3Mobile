import React from 'react';
import { StyleSheet, TextInput, Button, Alert, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import * as Yup from 'yup';

const employeeSchema = Yup.object().shape({
  employeeId: Yup.string()
    .required('Employee ID is required')
    .min(4, 'Minimum 4 characters')
    .max(10, 'Maximum 10 characters'),

  firstName: Yup.string()
    .required('First name is required')
    .min(2, 'Minimum 2 characters'),

  lastName: Yup.string()
    .required('Last name is required')
    .min(2, 'Minimum 2 characters'),

  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),

  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone must be exactly 10 digits')
    .required('Phone number is required'),
});

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{
          employeeId: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
        }}
        validationSchema={employeeSchema}
        validateOnMount
        onSubmit={(values) => {
          Alert.alert('Success', 'Employee information submitted!');
          console.log(values);
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
        }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Employee ID"
              value={values.employeeId}
              onChangeText={handleChange('employeeId')}
              onBlur={handleBlur('employeeId')}
            />
            {touched.employeeId && errors.employeeId && (
              <Text style={styles.error}>{errors.employeeId}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={values.firstName}
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
            />
            {touched.firstName && errors.firstName && (
              <Text style={styles.error}>{errors.firstName}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={values.lastName}
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
            />
            {touched.lastName && errors.lastName && (
              <Text style={styles.error}>{errors.lastName}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
            />
            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={values.phone}
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
            />
            {touched.phone && errors.phone && (
              <Text style={styles.error}>{errors.phone}</Text>
            )}

            <Button
              title="Submit"
              onPress={handleSubmit}
              disabled={!isValid}
            />
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});