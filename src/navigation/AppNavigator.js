// src/navigation/AppNavigator.js
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

// Screens - Public
import SplashScreen from "../screens/Splashscreen";
import UserSelectScreen from "../screens/UserSelectScreen";
import ArticlesScreen from "../screens/public/ArticlesScreen";
import ContactsScreen from "../screens/public/ContactsScreen";
import FamilyScreen from "../screens/public/FamilyScreen";
import PopulationScreen from "../screens/public/PopulationScreen";

// Screens - Progress
import ProgressAuthScreen from "../screens/progress/ProgressAuthScreen";
import ProgressDashboardScreen from "../screens/progress/ProgressDashboardScreen";
import ProgressDiaryScreen from "../screens/progress/ProgressDiaryScreen";
import ProgressWelcomeScreen from "../screens/progress/ProgressWelcomeScreen";

// Screens - Institutional
import InstitutionArticlesListScreen from "../screens/institutional/InstituitonArticlesListScreen";
import InstitutionEditArticleScreen from "../screens/institutional/InstituitonEditArticleScreen";
import InstitutionDashboardScreen from "../screens/institutional/InstitutionDashboardScreen";
import InstitutionLoginScreen from "../screens/institutional/InstitutionLoginScreen";
import InstitutionStatsScreen from "../screens/institutional/InstitutionStatsScreen";
import InstitutionUploadArticleScreen from "../screens/institutional/InstitutionUploadArticleScreen";

const Stack = createStackNavigator();

const navigationScreens = [
  { name: "Splash", component: SplashScreen },
  { name: "UserSelect", component: UserSelectScreen },

  // Public Screens
  { name: "Population", component: PopulationScreen },
  { name: "Family", component: FamilyScreen },
  { name: "Articles", component: ArticlesScreen },
  { name: "Contacts", component: ContactsScreen },

  // Progress Screens
  { name: "ProgressWelcome", component: ProgressWelcomeScreen },
  { name: "ProgressAuthScreen", component: ProgressAuthScreen },
  { name: "ProgressDashboard", component: ProgressDashboardScreen },
  { name: "ProgressDiary", component: ProgressDiaryScreen },

  // Institutional Screens
  { name: "InstitutionLogin", component: InstitutionLoginScreen },
  { name: "InstitutionDashboard", component: InstitutionDashboardScreen },
  {
    name: "InstitutionUploadArticle",
    component: InstitutionUploadArticleScreen,
  },
  { name: "InstitutionArticlesList", component: InstitutionArticlesListScreen },
  { name: "InstitutionStats", component: InstitutionStatsScreen },
  { name: "InstitutionEditArticle", component: InstitutionEditArticleScreen },
];

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "#fff" },
        }}
      >
        {navigationScreens.map((screen) => (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
