import { Catalog } from "./components/Catalog/Catalog";
import { Header } from "./components/Header/Header";
import { Navigation } from "./components/Navigation/Navigation";

function App() {
  return (
    <>
      <Header />
      <main>
        <Navigation />
        <Catalog />
      </main>
      <footer></footer>
    </>
  );
}

export default App;
