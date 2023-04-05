import { FC } from "react";
import Cards from "./components/cards/cards";
import MainLayout from "./components/main-layout";


const App: FC = () => (
  <MainLayout>
    <Cards />
  </MainLayout>
);

export default App;
