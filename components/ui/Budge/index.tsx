import {Text, View, StyleSheet} from "react-native";
import React from "react";

export const Budge = ({title, backgroundColor}:{title:string, backgroundColor:string}) => {
    return (
        <View style={[styles.cryptoBadge, {backgroundColor}]}>
            <Text style={styles.cryptoBadgeText}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    cryptoBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    cryptoBadgeText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 12,
    },
});
