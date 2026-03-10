import React, { useState, useCallback } from "react";
import { styles } from "./style";
import { Text, View, FlatList, TouchableOpacity, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
// Importo o AsyncStorage para recuperar as tarefas que salvei na outra tela
import AsyncStorage from "@react-native-async-storage/async-storage";
// Importo o useFocusEffect para que a lista atualize toda vez que eu clicar na aba
import { useFocusEffect } from "@react-navigation/native";

export function ListarTarefa() {
  // Eu defini este estado para armazenar a lista completa de tarefas vindas do celular
  const [tarefas, setTarefas] = useState([]);

  // Criei esta função assíncrona para "conversar" com o armazenamento local
  async function carregarTarefas() {
    try {
      // Eu busco os dados usando a mesma chave que defini na tela de adição
      const dadosSalvos = await AsyncStorage.getItem("@app_tarefas");
      if (dadosSalvos) {
        // Se houver dados, eu transformo a string JSON de volta para um objeto JS
        setTarefas(JSON.parse(dadosSalvos));
      }
    } catch (error) {
      console.log("Erro ao carregar:", error);
    }
  }

  // Usei este Hook para garantir que a lista seja recarregada toda vez que eu entrar nesta aba
  useFocusEffect(
    useCallback(() => {
      carregarTarefas();
    }, [])
  );

  // =========================================================
  // MINHA LOGICA PARA EXCLUIR TAREFA
  // =========================================================
  async function deletarTarefa(id) {
    // Eu exibo um alerta de confirmação para evitar que eu apague algo por acidente
    Alert.alert("Excluir", "Tem certeza que deseja apagar esta tarefa?", [
      { text: "Cancelar", style: "cancel" },
      { 
        text: "Sim", 
        onPress: async () => {
          try {
            // Eu uso o .filter() para criar uma nova lista sem o item que possui o ID clicado
            const novasTarefas = tarefas.filter((tarefa) => tarefa.id !== id);
            
            setTarefas(novasTarefas); // Atualizo o estado para refletir na tela na hora
            await AsyncStorage.setItem("@app_tarefas", JSON.stringify(novasTarefas)); // Salvo a nova lista
          } catch (error) {
            console.log("Erro ao deletar:", error);
          }
        }
      }
    ]);
  }

  // =========================================================
  // MINHA LOGICA PARA CONCLUIR TAREFA
  // =========================================================
  async function concluirTarefa(id) {
    try {
      // Eu percorro a lista com .map(). Se encontrar o ID, altero apenas o campo 'concluida'
      const novasTarefas = tarefas.map((tarefa) => 
        tarefa.id === id ? { ...tarefa, concluida: true } : tarefa
      );

      setTarefas(novasTarefas); // Atualizo a tela
      await AsyncStorage.setItem("@app_tarefas", JSON.stringify(novasTarefas)); // Salvo no banco local
      
      Alert.alert("Sucesso", "Tarefa movida para Concluídas!");
    } catch (error) {
      console.log("Erro ao concluir:", error);
    }
  }

  // Eu criei esta variável para filtrar e exibir apenas as tarefas que ainda estão pendentes
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
        {/* Eu utilizei a FlatList por ser a forma mais eficiente de renderizar listas no React Native */}
        <FlatList
          data={tarefasPendentes} // Passo apenas as tarefas que filtrei como pendentes
          keyExtractor={(item) => item.id} // Uso o ID único que gerei com Date.now()
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            // Para cada item, eu desenho um Card com o nome e os botões de ação
            <View style={styles.taskCard}>
              <Text style={styles.taskText}>{item.nome}</Text>

              <View style={styles.actionButtons}>
                {/* Botão verde que eu programei para marcar como concluída */}
                <TouchableOpacity onPress={() => concluirTarefa(item.id)}>
                  <Ionicons name="checkmark-circle-outline" size={28} color="green" />
                </TouchableOpacity>

                {/* Botão vermelho que eu programei para deletar permanentemente */}
                <TouchableOpacity onPress={() => deletarTarefa(item.id)}>
                  <Ionicons name="trash-outline" size={28} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          // Se a minha lista estiver vazia, eu mostro esta mensagem personalizada
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>Nenhuma tarefa pendente no momento! 🎉</Text>
          )}
        />
      </View>
    </View>
  );
}