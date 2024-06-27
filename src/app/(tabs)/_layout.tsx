import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { AntDesign, Entypo, Fontisto } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: useClientOnlyValue(false, true),
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background,
          elevation: 20,
          shadowColor: "#000",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          shadowOffset: { height: -4, width: 0 },
          shadowOpacity: 0.7,
          position: "absolute",
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,

          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Entypo name="home" size={24} color={color} />
            ) : (
              <AntDesign name="home" size={24} color={color} />
            ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <FontAwesome name="search" size={24} color={color} />
            ) : (
              <AntDesign name="search1" size={24} color={color} />
            ),
        }}
      />

      <Tabs.Screen
        name="projects-saved"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}>
              <Fontisto name="favorite" size={24} color={color} />
              {!focused && (
                <Fontisto
                  name="favorite"
                  size={18}
                  color={Colors[colorScheme ?? "light"].background}
                  style={[
                    StyleSheet.absoluteFill,
                    {
                      marginLeft: 1.35,
                      marginTop: 1.5,
                    },
                  ]}
                />
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
