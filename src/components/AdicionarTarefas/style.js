import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flex: 1,
    height: "50%",
    width: "100%",
    backgroundColor: "#0047AB",
    justifyContent: "center",
    alignItems: "center",
    borderEndEndRadius: 20,
    borderStartEndRadius: 20,
  },
  textHeader: {
    fontSize: 70,
    fontWeight: "bold",
    marginBottom: 90,
  },
  textYellow: {
    color: "#fff",
    marginLeft: 50,
  },
  prancheta: {
    width: 5,
    height: 5,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 5,
    width: "75%",
    fontSize: 15,
    fontWeight: "bold",
  },
  iconAdicionar: {
    width: 50,
    height: 50,
  },

  section: {
    backgroundColor: "#fff",
    height: "50%",
  },
});
