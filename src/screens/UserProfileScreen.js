import React from "react";

import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { signOut, getAuth } from "firebase/auth";
// import { auth } from "../../firebaseConfig";
import app from "../../firebaseConfig";

import { Feather } from "@expo/vector-icons";
import CardSmall from "../components/CardSmall";
import { showTopMessage } from "../utils/ErrorHandler";
import { colors } from "../styles/Theme";
import UploadImage from "../components/UploadImage";

export default function UserProfileScreen({ navigation }) {
    const userInfo = {
        id: 0,
        firstName: "Aman",
        lastName: "Vashishtha",
        district: "New Delhi",
    };
    //sing out user
    function handleSignOut() {
        const auth = getAuth(app);

        signOut(auth)
            .then((res) => {
                showTopMessage("Oturum sonlandı", "success");
                goToLogin();
            })
            .catch((err) => console.log(err));
    }

    // Navigation
    function goToLogin() {
        navigation.navigate("LoginScreen");
    }

    // Navigation
    function goToBookingHistory() {
        navigation.navigate("BookingHistoryScreen");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header_text}>Profile</Text>

            <View style={styles.section_container}>

                <View style={styles.user_card}>
                    <View style={styles.title_container}>
                        <Text style={styles.title}>
                            {userInfo.firstName} {userInfo.lastName}
                        </Text>
                        <Text style={styles.desc}>{userInfo.district}</Text>
                    </View>
                    <UploadImage/>
                </View>

                <CardSmall
                
                    iconName={"user"}
                    text={"user info"}
                />
                <CardSmall
                    // onSelect={goToBookingHistory}
                    iconName={"list"}
                    text={"other details"}
                />
                <CardSmall
                    iconName={"message-square"}
                    text={"supprt"}
                />

                <View style={styles.logo_container}>
                    <Text style={styles.logo_text}>Wise Doctor</Text>
                    <TouchableOpacity
                        style={styles.logout_container}
                        onPress={handleSignOut}
                    >
                        <Text style={styles.text}>Log out </Text>
                        <Feather
                            style={styles.icon}
                            name="log-out"
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 48,
    },
    user_card: {
        flexDirection: "row",
        borderRadius: 20,
        marginHorizontal: 24,
        marginBottom: 16,
        backgroundColor: colors.color_white,
        padding:16
    },
    section_container: {
        flex: 1,
        marginBottom: 16,
    },
    text_container: {
        flex: 1,
    },
    title_container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal:16
    },
    title: {
        fontSize: 18,
        
    },
    desc: {
        fontSize: 14,
        
        color: colors.color_gray,
    },
    logout_container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems:"center"
    },
    header_text: {
        marginHorizontal: 24,
        marginVertical: 16,
        fontSize: 30,
        
    },
    logo_container: {
        flex: 1,
        marginVertical: 24,
        alignItems: "center",
    },
    logo_text: {
        fontSize: 34,
        
        color: colors.color_light_gray,
    },
    icon: {
        padding: 4,
    },
    text: {
        padding: 8,
        fontSize: 18,
        
    },
});
