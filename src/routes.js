import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

// Importo as páginas que eu criei para compor a navegação do meu app
import { AdicionarTarefa } from "../src/components/AdicionarTarefas";
import { ListarTarefa } from "../src/components/ListarTarefas";
import { TarefaConcluida } from "../src/components/TarefasConcluidas";

// Eu inicializo o Tab Navigator. Uso 'Tab' com letra maiúscula por ser um componente React.
const Tab = createBottomTabNavigator(); 

export function Routes() {
  return (
    <Tab.Navigator
      screenOptions={{
        // Eu decidi esconder o header padrão pois criei um cabeçalho personalizado em cada tela
        headerShown: false, 
        // Defini o azul oficial do meu projeto para destacar a aba que estou usando
        tabBarActiveTintColor: "#0047AB", 
        // Aqui eu estilizei a barra inferior para ficar mais moderna e limpa
        tabBarStyle: { 
          backgroundColor: "#FFF", 
          borderTopWidth: 0, // Removi a linha superior para um visual mais "flat"
          height: 60,        // Dei mais altura para melhorar o clique no celular
          paddingBottom: 5   // Ajustei o respiro dos ícones embaixo
        },
      }}
    >
      {/* Configurei a aba principal para ser a de Adicionar Tarefas */}
      <Tab.Screen
        name="Adicionar"
        component={AdicionarTarefa}
        options={{
          tabBarIcon: ({ color, size }) => (
            // Escolhi o ícone de 'mais' para indicar a criação de novos itens
            <Ionicons name="add-circle" color={color} size={size} />
          ),
        }}
      />

      {/* Criei a aba de Lista para gerenciar as tarefas que ainda não terminei */}
      <Tab.Screen 
        name="Lista" 
        component={ListarTarefa} 
        options={{
          tabBarIcon: ({ color, size }) => (
            // Usei o ícone de lista padrão para facilitar a identificação
            <Ionicons name="list" color={color} size={size} />
          )
        }}
      />

      {/* Por fim, a aba de Concluídas, que serve como o meu histórico de sucessos */}
      <Tab.Screen 
        name="Concluídas" 
        component={TarefaConcluida} 
        options={{
          tabBarIcon: ({ color, size }) => (
            // Usei o ícone de 'check' duplo para simbolizar a tarefa finalizada
            <Ionicons name="checkmark-done" color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  );
}