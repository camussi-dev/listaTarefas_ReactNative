import React, { useState, useCallback } from "react";
import { styles } from "./style"; 
import { Text, View, FlatList } from "react-native"; 
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
// Importo o AsyncStorage para acessar o banco de dados local do aplicativo
import AsyncStorage from "@react-native-async-storage/async-storage";
// Uso o useFocusEffect para garantir que, se eu concluir uma tarefa em outra aba,
// ela apareça aqui imediatamente quando eu abrir esta tela.
import { useFocusEffect } from "@react-navigation/native";

export function TarefaConcluida() {
  // Eu criei este estado para armazenar todas as tarefas e depois filtrá-las
  const [tarefas, setTarefas] = useState([]);

  // Esta função eu utilizo para ler os dados que salvei no AsyncStorage
  async function carregarTarefas() {
    try {
      const dadosSalvos = await AsyncStorage.getItem("@app_tarefas");
      if (dadosSalvos) {
        // Eu converto os dados de texto para um formato que o JavaScript entenda (JSON)
        setTarefas(JSON.parse(dadosSalvos));
      }
    } catch (error) {
      console.log("Erro ao carregar:", error);
    }
  }

  // Usei o Hook useFocusEffect combinado com useCallback para monitorar o foco da tela.
  // Isso faz com que a lista seja atualizada "automaticamente" aos olhos do usuário.
  useFocusEffect(
    useCallback(() => {
      carregarTarefas();
    }, [])
  );

  // Aqui eu aplico um filtro importante: eu só quero que esta tela mostre
  // as tarefas que possuem a propriedade 'concluida' marcada como TRUE.
  const tarefasFinalizadas = tarefas.filter((tarefa) => tarefa.concluida === true);

  return (
    <View style={styles.container}>
      {/* Configurei a StatusBar para manter o padrão visual de cores escuras no topo */}
      <StatusBar barStyle="light-content" backgroundColor="#004571" />

      <View style={styles.header}>
        <Text style={styles.textHeader}>
          Tarefas {"\n"}
          <Text style={styles.textYellow}>Concluídas</Text>
        </Text>
      </View>

      <View style={styles.listarTarefa}>
        {/* Eu utilizei a FlatList para renderizar o histórico de forma otimizada */}
        <FlatList
          data={tarefasFinalizadas} // Passo a minha lista filtrada apenas com as finalizadas
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskCard}>
              {/* Eu adicionei este ícone de check fixo. Ele não é clicável, 
                  serve apenas como um reforço visual de "tarefa feita". */}
              <Ionicons name="checkmark-done-circle" size={24} color="#A9A9A9" style={{ marginRight: 10 }} />
              
              {/* Exibo o nome da tarefa. No meu CSS, eu configurei para este texto aparecer riscado. */}
              <Text style={styles.taskText}>
                {item.nome}
              </Text>
            </View>
          )}
          // Caso eu ainda não tenha terminado nenhuma tarefa, exibo esta mensagem motivadora.
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>Seu histórico está vazio. ✍️</Text>
          )}
        />
      </View>
    </View>
  );
}