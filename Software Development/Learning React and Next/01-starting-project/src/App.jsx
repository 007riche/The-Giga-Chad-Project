import componentsImg from "./assets/components.png"
import Header from "./components/Header/Header";
import CoreConcepts from "./components/Concept/CoreConcepts";
import Examples from "./components/DetailedContent/Examples";

// const reactDescriptions = ['Fundamental', 'Crucial', 'Core'];

function App() {
  return (
    // <div>
    <>
      <Header />
      <main>
        <CoreConcepts />
        <Examples />
      </main>
      {/* </div> */}
    </>
  );
}

export default App;