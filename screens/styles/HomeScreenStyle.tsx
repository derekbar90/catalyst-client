import { StyleSheet } from "react-native";

export const HomeScreenStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: 'center'
  },
  welcomeContainer: {
    paddingTop: '20%',
    paddingHorizontal: 20,
  },
  welcomeHeader: {
    fontSize: 32,
    lineHeight: 40,
  },
  welcomeText: {
    flex: 1,
    marginVertical: 10,
    flexDirection: "column",
    alignItems: 'center',
    lineHeight: 30,
  }
})