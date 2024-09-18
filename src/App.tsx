import { Container } from "./components/Container";
import { Header } from "./components/Header";
import { CurrencyConverter } from "./components/CurrencyConverter";

function App() {
  return (
    <>
      <Header />
      <Container>
        <CurrencyConverter />
      </Container>
    </>
  );
}

export default App;
