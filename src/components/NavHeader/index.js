import React, { useState } from "react";
import { View, Image, StyleSheet, Text, Platform,Pressable } from "react-native";

import { Ionicons } from "@expo/vector-icons";

const NavHeader = ({
    goBack,
    title = "",
    leftBtnVisible = true,
    saveButtonVisible = true,
    titleIcon,
    iconStyles = [],
    children,
}) => {

    return (
        <View style={styles.navHeader}>
            {leftBtnVisible && (
                <Pressable style={styles.backBtn} onPress={goBack}>
                    <Ionicons name="arrow-back" size={20} />
                </Pressable>
            )}
            <View style={[styles.titleWrapper]}>
                {titleIcon && <Image source={titleIcon} style={[styles.titleIcon, iconStyles]} />}
                {children}
                <Text style={styles.title}>{title}</Text>
            </View>
        </View>
    );
};

export default NavHeader;

const styles = StyleSheet.create({
    navHeader: {
        width:'100%',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: Platform.OS === "android" ? 74 : 50,
        borderBottomColor: "#E1EAF0",
        borderBottomWidth: 1,
    },
    backBtn: {
        position: "absolute",
        left: 0,
        paddingHorizontal: 20,
        paddingTop: Platform.OS === "android" ? 26 : 2,
    },
    titleWrapper: {
        paddingTop: Platform.OS === "android" ? 24 : 0,
    },
    title: {
        fontSize: 16,
        fontWeight: "700",
        color: "#262E3F",
        // fontFamily: fonts.header,
    },
    titleIcon: {
        marginRight: 6,
        width: 18,
        height: 16,
    },
    saveBtn: {
        position: "absolute",
        right: 0,
        bottom: 13,
        paddingHorizontal: 20,
        paddingTop: Platform.OS === "android" ? 12 : 0,
    },
    saveBtnText: {
        // fontFamily: fonts.header,
        fontSize: 16,
        fontWeight: "700",
        color: 'blue',
    },
});
