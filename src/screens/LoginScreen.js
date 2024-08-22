import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Button from "../components/button/Button";
import InputBar from "../components/InputBar";
import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
// import app from "../../firebaseConfig";

import { Formik } from "formik";
import ErrorHandler, { showTopMessage } from "../utils/ErrorHandler";
import { colors } from "../styles/Theme";

const initialFormValues = {
    usermail: "",
    password: "",
};

const LoginScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    function handleFormSubmit(formValues) {
        // const auth = getAuth(app);

        setLoading(true); // İşlem başladığında yüklemeyi etkinleştir

        signInWithEmailAndPassword(
            auth,
            formValues.usermail,
            formValues.password
        )
            .then((res) => {
                showTopMessage("Login succesfull !", "success");
                setLoading(false); // İşlem tamamlandığında yüklemeyi devre dışı bırak
                goToUserProfile();
            })
            .catch((err) => {
                setLoading(false);
                showTopMessage(ErrorHandler(err.code), "danger");
            });
    }

    // Navigation

    function goToMemberSignUp() {
        navigation.navigate("SignUpScreen");
    }

    // Navigation

    function goToUserProfile() {
        navigation.navigate("UserProfileScreen");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}> Login  </Text>
            <Formik
                initialValues={{ initialFormValues }}
                onSubmit={handleFormSubmit}
            >
                {({ values, handleChange, handleSubmit }) => (
                    <>
                        <View style={styles.input_container}>
                            <InputBar
                                onType={handleChange("usermail")}
                                value={values.usermail}
                                placeholder={"E-mail Address"}
                            />
                            <InputBar
                                onType={handleChange("password")}
                                value={values.password}
                                placeholder={"Password"}
                                isSecure
                            />
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.detail}>forgot password?</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.button_container}>
                            <View style={styles.button}>
                                <Button
                                    text="Submit"
                                    onPress={handleSubmit}
                                    loading={loading}
                                />
                            </View>
                            <View style={styles.button}>
                                <Button
                                    text="SignUp"
                                    onPress={goToMemberSignUp}
                                    theme="secondary"
                                />
                            </View>
                        </View>
                    </>
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        marginTop: 48,
        paddingHorizontal: 24,
    },
    text: {
        marginVertical: 32,
        fontSize: 30,
        
    },
    detail: {
        fontSize: 14,
        
        color:colors.color_gray
    },
    button_container: {
        paddingVertical: 8,
    },
    button: {
        paddingVertical: 8,
        flexDirection: "row",
    },
});

export default LoginScreen;
