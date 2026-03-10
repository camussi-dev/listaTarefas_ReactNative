import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

// paginas de navegação
import { AdicionarTarefa } from "../src/components/AdicionarTarefas";
import { ListarTarefa } from "../src/components/ListarTarefas";
import { TarefaConcluida } from "../src/components/TarefasConcluidas";

// CORREÇÃO: Nome da função e variável em maiúsculo (padrão React)
const Tab = createBottomTabNavigator(); 

export function Routes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, 
        tabBarActiveTintColor: "#0047AB", 
        tabBarStyle: { 
          backgroundColor: "#FFF", 
          borderTopWidth: 0, // Remove a linha chata no topo da aba
          height: 60, // Dá um pouco mais de espaço para os ícones
          paddingBottom: 5
        },
      }}
    >
      <Tab.Screen
        name="Adicionar"
        component={AdicionarTarefa}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Lista" 
        component={ListarTarefa} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen 
        name="Concluídas" 
        component={TarefaConcluida} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="checkmark-done" color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  );
}