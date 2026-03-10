import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  header: {
    height: "55%",
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
    marginRight: 90,
  },
  textYellow: {
    color: "white",
    fontSize: 55,
  },
  listarTarefa: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  taskCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9", // Um cinza bem clarinho para itens concluídos
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
    // Sombra leve para o card (opcional)
    elevation: 2, 
  },
  taskText: {
    fontSize: 18,
    color: "#A9A9A9", // Texto em cinza escuro (parece desativado)
    flex: 1,
    textDecorationLine: "line-through", // RISCADO: O toque final de tarefa pronta!
  },
  actionButtons: {
    marginLeft: 10,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: "#999",
    fontSize: 16,
    fontStyle: "italic",
  },
});
