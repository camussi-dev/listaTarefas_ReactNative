// importa a estilização
import { styles } from "./style";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Add from "../../assets/adicionar.png";
import { useState } from "react";

export function AdicionarTarefa() {
  // Variável que guarda o que o usuário está digitando agora
  const [tarefa, setTarefa] = useState("");

  // Função para salvar a terefa
  async function handleAdd() {
    if (tarefa === "") {
      Alert.alert("Atenção", "Digite o nome da tarefa antes de adicionar!");
      return;
    }

    try {
      const chaveItem = "@app_tarefas";

      // Busca o que já tem lá salvo
      const dadosAntigos = await AsyncStorage.getItem(chaveItem);
      const tarefasAtuais = dadosAntigos ? JSON.parse(dadosAntigos) : [];

      // Cria o novo objeto de tarefa
      const novaTarefa = {
        id: Date.now().toString(), // Gera um ID único
        nome: tarefa,
        concluida: false, // Por padrão, começa não concluída
      };

      // 3. Junta a nova tarefa com as antigas e salva
      const dadosParaSalvar = JSON.stringify([...tarefasAtuais, novaTarefa]);
      await AsyncStorage.setItem(chaveItem, dadosParaSalvar);

      Alert.alert("Sucesso", "Tarefa adicionada!");
      setTarefa(""); // Limpa o campo de texto
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível salvar a tarefa");
    }
  }

  return (
    <View style={styles.container}>
      {/* Deixa a barra de cima com ícones brancos */}
      <StatusBar barStyle="light-content" backgroundColor="#004571" />

      <View style={styles.header}>
        <Text style={styles.textHeader}>
          Lista de <Text style={styles.prancheta}>📋</Text> {"\n"}
          <Text style={styles.textYellow}>Tarefas</Text>
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Estudar Matemática..."
            placeholderTextColor="#999"
            value={tarefa} // liga o input à variável
            onChangeText={setTarefa} // Atualiza a variável conforme digita
          />
          {/* Botão de adicionar */}
          <TouchableOpacity style={styles.addButon} onPress={handleAdd}>
            <Image source={Add} style={styles.iconAdicionar}></Image>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}></View>
    </View>
  );
}

// style={styles.logo}
