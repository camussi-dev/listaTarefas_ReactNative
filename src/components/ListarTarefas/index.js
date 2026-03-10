import React, { useState, useCallback } from "react";
import { styles } from "./style";
import { Text, View, FlatList, TouchableOpacity, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export function ListarTarefa() {
  const [tarefas, setTarefas] = useState([]);

  // 1. Carrega todas as tarefas
  async function carregarTarefas() {
    try {
      const dadosSalvos = await AsyncStorage.getItem("@app_tarefas");
      if (dadosSalvos) {
        setTarefas(JSON.parse(dadosSalvos));
      }
    } catch (error) {
      console.log("Erro ao carregar:", error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarTarefas();
    }, [])
  );

  // =========================================================
  // FUNÇÃO 1: EXCLUIR TAREFA (Requisito 4)
  // =========================================================
  async function deletarTarefa(id) {
    // Pede confirmação antes de apagar
    Alert.alert("Excluir", "Tem certeza que deseja apagar esta tarefa?", [
      { text: "Cancelar", style: "cancel" },
      { 
        text: "Sim", 
        onPress: async () => {
          try {
            // filter() cria uma nova lista ignorando o item que tem o ID clicado
            const novasTarefas = tarefas.filter((tarefa) => tarefa.id !== id);
            
            setTarefas(novasTarefas); // Atualiza a tela
            await AsyncStorage.setItem("@app_tarefas", JSON.stringify(novasTarefas)); // Salva no banco
          } catch (error) {
            console.log("Erro ao deletar:", error);
          }
        }
      }
    ]);
  }

  // =========================================================
  // FUNÇÃO 2: CONCLUIR TAREFA (Requisito 3)
  // =========================================================
  async function concluirTarefa(id) {
    try {
      // map() percorre a lista. Se achar o ID clicado, muda o "concluida" para true
      const novasTarefas = tarefas.map((tarefa) => 
        tarefa.id === id ? { ...tarefa, concluida: true } : tarefa
      );

      setTarefas(novasTarefas); // Atualiza a tela
      await AsyncStorage.setItem("@app_tarefas", JSON.stringify(novasTarefas)); // Salva no banco
      
      Alert.alert("Sucesso", "Tarefa movida para Concluídas!");
    } catch (error) {
      console.log("Erro ao concluir:", error);
    }
  }

  // Filtramos a lista para mostrar AQUI apenas as que NÃO estão concluídas
  const tarefasPendentes = tarefas.filter((tarefa) => tarefa.concluida === false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#004571" />

      <View style={styles.header}>
        <Text style={styles.textHeader}>
          Listar {"\n"}
          <Text style={styles.textYellow}>Tarefas</Text>
        </Text>
      </View>

      <View style={styles.listarTarefa}>
        <FlatList
          data={tarefasPendentes} // Usamos a lista filtrada aqui!
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.taskCard}>
              <Text style={styles.taskText}>{item.nome}</Text>

              <View style={styles.actionButtons}>
                {/* BOTÃO DE CONCLUIR - Chama a função passando o ID do item */}
                <TouchableOpacity onPress={() => concluirTarefa(item.id)}>
                  <Ionicons name="checkmark-circle-outline" size={28} color="green" />
                </TouchableOpacity>

                {/* BOTÃO DE DELETAR - Chama a função passando o ID do item */}
                <TouchableOpacity onPress={() => deletarTarefa(item.id)}>
                  <Ionicons name="trash-outline" size={28} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>Nenhuma tarefa pendente no momento! 🎉</Text>
          )}
        />
      </View>
    </View>
  );
}