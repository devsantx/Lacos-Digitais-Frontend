import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/colors";

export default function Header({ showBack = true, backTo = "UserSelect" }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {showBack ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate(backTo)}
          >
            <Ionicons name="chevron-back" size={24} color={COLORS.gray700} />
          </TouchableOpacity>
        ) : (
          <View style={styles.backButton} />
        )}

        <View
          style={[
            styles.logoContainer,
            !showBack && styles.logoContainerCentered,
          ]}
        >
          <View style={styles.logoCircle}>
            <View style={styles.logoInner} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>LAÇOS DIGITAIS</Text>
            <Text style={styles.subtitle}>
              UM ELO ENTRE INFORMAÇÃO, PREVENÇÃO E CUIDADO.
            </Text>
          </View>
        </View>

        <View style={styles.backButton} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  logoContainerCentered: {
    marginHorizontal: 0,
  },
  logoCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  logoInner: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 9,
    color: COLORS.gray600,
    marginTop: 2,
  },
});
