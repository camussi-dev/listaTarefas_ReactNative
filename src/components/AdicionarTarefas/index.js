// Importo minha estilização personalizada que defini no arquivo style.js
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
// Importo o AsyncStorage para conseguir salvar os dados de forma permanente no celular
import AsyncStorage from "@react-native-async-storage/async-storage";
// Importo a imagem do ícone de adição que guardei nos meus assets
import Add from "../../assets/adicionar.png";
// Importo o Hook useState para gerenciar o estado do meu campo de texto
import { useState } from "react";

export function AdicionarTarefa() {
  // Eu criei este estado para monitorar, em tempo real, o que eu estou digitando no input
  const [tarefa, setTarefa] = useState("");

  // Esta é a função principal que eu criei para processar e salvar a nova tarefa
  async function handleAdd() {
    // Primeiro, eu verifico se o campo não está vazio para evitar salvar "tarefas fantasmas"
    if (tarefa === "") {
      Alert.alert("Atenção", "Digite o nome da tarefa antes de adicionar!");
      return;
    }

    try {
      // Defini uma chave única para o meu "banco de dados" local
      const chaveItem = "@app_tarefas";

      // Eu busco o que já existe salvo no celular para não sobrescrever a lista antiga
      const dadosAntigos = await AsyncStorage.getItem(chaveItem);
      // Se houver dados, eu os transformo de texto para lista (Array); se não, começo uma lista vazia
      const tarefasAtuais = dadosAntigos ? JSON.parse(dadosAntigos) : [];

      // Aqui eu monto o objeto da minha tarefa com as propriedades que eu defini
      const novaTarefa = {
        id: Date.now().toString(), // Eu uso o timestamp atual para garantir que o ID seja sempre único
        nome: tarefa,
        concluida: false, // Eu defini que toda tarefa nova nasce como "pendente" (false)
      };

      // Eu junto a tarefa nova com as que eu já tinha buscado usando o operador spread (...)
      const dadosParaSalvar = JSON.stringify([...tarefasAtuais, novaTarefa]);
      // Finalmente, eu gravo a lista atualizada de volta no armazenamento do aparelho
      await AsyncStorage.setItem(chaveItem, dadosParaSalvar);

      // Aviso que deu tudo certo e limpo o campo de texto para a próxima entrada
      Alert.alert("Sucesso", "Tarefa adicionada!");
      setTarefa(""); 
    } catch (error) {
      // Se algo der errado no processo (falta de memória, erro no banco), eu capturo o erro aqui
      console.log(error);
      Alert.alert("Erro", "Não foi possível salvar a tarefa");
    }
  }

  return (
    <View style={styles.container}>
      {/* Configurei a barra de status para combinar com o azul escuro do meu cabeçalho */}
      <StatusBar barStyle="light-content" backgroundColor="#004571" />

      <View style={styles.header}>
        {/* Meu título principal com a logo de prancheta que eu escolhi */}
        <Text style={styles.textHeader}>
          Lista de <Text style={styles.prancheta}>📋</Text> {"\n"}
          <Text style={styles.textYellow}>Tarefas</Text>
        </Text>

        {/* Container que agrupa meu input e o meu botão de adicionar */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Estudar Matemática..."
            placeholderTextColor="#999"
            value={tarefa} // Aqui eu faço a "ligação direta" entre o texto e o meu estado
            onChangeText={setTarefa} // Toda vez que eu digito, meu estado 'tarefa' se atualiza sozinho
          />
          
          {/* Meu botão de ação que dispara a função handleAdd que eu expliquei acima */}
          <TouchableOpacity style={styles.addButon} onPress={handleAdd}>
            <Image source={Add} style={styles.iconAdicionar}></Image>
          </TouchableOpacity>
        </View>
      </View>

      {/* Espaço reservado para separar o cabeçalho do restante do conteúdo */}
      <View style={styles.section}></View>
    </View>
  );
}