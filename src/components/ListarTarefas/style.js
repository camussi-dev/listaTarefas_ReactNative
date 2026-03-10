import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  header: {
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
    marginRight: 130,
  },
  textYellow: {
    color: "white",
    fontSize: 55,
  },
  listarTarefa: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  taskCard: {
    flexDirection: "row", // Coloca o texto e os botões lado a lado
    justifyContent: "space-between", // Empurra o texto pra esquerda e botões pra direita
    alignItems: "center",
    backgroundColor: "#f5f5f5", // Um fundo cinza bem clarinho
    padding: 15,
    borderRadius: 10,
    marginBottom: 10, // Espaço entre uma tarefa e outra
    borderWidth: 1,
    borderColor: "#ddd",
  },
  taskText: {
    fontSize: 18,
    color: "#333",
    flex: 1, // Faz o texto ocupar o espaço livre para não empurrar os botões
  },
  actionButtons: {
    flexDirection: "row",
    gap: 15, // Espaço entre o botão de concluir e o de excluir
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: "#888",
    fontSize: 16,
  },
});
