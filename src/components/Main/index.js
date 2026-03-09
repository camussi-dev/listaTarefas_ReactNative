// importa a estilização
import { styles } from "./style";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import Add from "../../assets/adicionar.png";

export default function App() {
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
          />
          {/* Botão de adicionar */}
          <TouchableOpacity style={styles.addButon}>
            <Image source={Add} style={styles.iconAdicionar}></Image>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}></View>
    </View>
  );
}

// style={styles.logo}
