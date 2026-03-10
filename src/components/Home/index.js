// Eu importo o NavigationContainer, que funciona como o "mapa" principal.
// Sem ele, o React Native não sabe como gerenciar as trocas de tela.
import { NavigationContainer } from "@react-navigation/native";

// Aqui eu busco as rotas que eu configurei lá no meu arquivo routes.js.
// É lá que eu defini que meu app terá uma barra de abas (Bottom Tabs).
import { Routes } from "../../routes";

export default function App() {
  return (
    // Eu envolvo todo o meu projeto com o NavigationContainer.
    // Ele é o responsável por manter o estado da navegação, ou seja, 
    // ele "sabe" em qual aba eu cliquei e qual tela deve mostrar agora.
    <NavigationContainer>
      
      {/* Eu chamo o meu componente de rotas aqui dentro. 
          Dessa forma, assim que o app abre, ele lê a estrutura 
          que eu criei no Routes e desenha a barra inferior.
      */}
      <Routes></Routes>

    </NavigationContainer>
  );
}