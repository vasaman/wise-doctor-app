import React, { useState } from "react";
import { View, Text, StyleSheet ,ScrollView,KeyboardAvoidingView} from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import Button from "../components/button/Button";
import InputBar from "../components/InputBar";
import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
// import app from "../../firebaseConfig";

import { Formik } from "formik";
import ErrorHandler, { showTopMessage } from "../utils/ErrorHandler";

const initialFormValues = {
    usermail: "",
    password: "",
    passwordre: "",
    role: "", 

};

export default function SignUpScreen() {
    const [loading, setLoading] = useState(false);

    function handleFormSubmit(formValues) {
        // const auth = getAuth(app);

        setLoading(true);

        if (formValues.password != formValues.passwordre) {
            showTopMessage(
                "Password does not match, try again!",
                "warning"
            );
            setLoading(false);
        } else {
            createUserWithEmailAndPassword(
              auth,
              formValues.usermail,
              formValues.password
            )
              .then((res) => {
                // Get the user ID
                const userId = res.user.uid;

                // Prepare the user data to be stored
                const userData = {
                  firstName: formValues.firstName,
                  lastName: formValues.lastName,
                  usermail: formValues.usermail,
                  phoneNumber: formValues.phoneNumber,
                  role: formValues.role,
                };

                // Add the user data to Firestore
                firestore().collection("users").doc(userId).set(userData);
              })
              .then(
                (res) => {
                  showTopMessage(" Registration Successful ! ", "success");
                  setLoading(false);
                }
                //buradan home screene gitmeli veya go back
              )
              .catch((err) => showTopMessage(ErrorHandler(err.code), "danger"));

            setLoading(false);
        }
    }

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ScrollView style={styles.container}>
          <Text style={styles.text}> Sign Up </Text>
          <Formik
            initialValues={{ initialFormValues }}
            onSubmit={handleFormSubmit}
          >
            {({ values, handleChange, handleSubmit }) => (
              <>
                <View style={styles.input_container}>
                  <InputBar placeholder={"first"} />
                  <InputBar placeholder={"last name"} />
                  <InputBar
                    onType={handleChange("usermail")}
                    value={values.usermail}
                    placeholder={"email"}
                  />
                  <InputBar
                    onType={handleChange("phoneNumber")}
                    value={values.phoneNumber}
                    placeholder={"Phone"}
                  />
                  <RNPickerSelect
                    onValueChange={handleChange("role")}
                    value={values.role}
                    placeholder={{ label: "I am a", value: null }}
                    items={[
                      { label: "Patient", value: "patient" },
                      { label: "Doctor", value: "doctor" },
                      {
                        label: "Hospital/Lab Personnel",
                        value: "hospital_lab_personnel",
                      },
                    ]}
                    style={pickerSelectStyles}
                  />
                  <InputBar
                    onType={handleChange("password")}
                    value={values.password}
                    placeholder={"password"}
                    isSecure
                  />
                  <InputBar
                    onType={handleChange("passwordre")}
                    value={values.passwordre}
                    placeholder={"confirm password"}
                    isSecure
                  />
                </View>
                <View style={styles.button_container}>
                  <Button
                    text="submit"
                    onPress={handleSubmit}
                    loading={loading}
                  />
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 48,
    },
    text: {
        marginHorizontal: 24,
        marginVertical: 32,
        fontSize: 30,
        
    },
    input_container: {
        marginHorizontal: 24,
    },
    button_container: {
        flexDirection: "row",
        margin: 16,
    },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    marginVertical: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    marginVertical: 10,
  },
});
