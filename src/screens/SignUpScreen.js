import React, { useState } from "react";
import { View, Text, StyleSheet ,ScrollView,KeyboardAvoidingView} from "react-native";
import Button from "../components/button/Button";
import InputBar from "../components/InputBar";
import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../firebaseConfig";
import app from "../../firebaseConfig";

import { Formik } from "formik";
import ErrorHandler, { showTopMessage } from "../utils/ErrorHandler";

const initialFormValues = {
    usermail: "",
    password: "",
    passwordre: "",
};

export default function SignUpScreen() {
    const [loading, setLoading] = useState(false);

    function handleFormSubmit(formValues) {
        const auth = getAuth(app);

        setLoading(true);

        if (formValues.password != formValues.passwordre) {
            showTopMessage(
                "Parola tekrarı uyuşmuyor, tekrar deneyin!",
                "warning"
            );
            setLoading(false);
        } else {
            createUserWithEmailAndPassword(
                auth,
                formValues.usermail,
                formValues.password
            )
                .then(
                    (res) => {
                        showTopMessage(" Kayıt Başarılı !", "success");
                        setLoading(false);
                    }
                    //buradan home screene gitmeli veya go back
                )
                .catch((err) =>
                    showTopMessage(ErrorHandler(err.code), "danger")
                );

            setLoading(false);
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
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
