import componentsImg from "./assets/components.png"
import { CORE_CONCEPTS, EXAMPLES } from "./data";
import Header from "./components/Header/Header";
import { CoreConcept } from "./components/CoreConcept";
import TabButton from "./components/TabButton"
import DetailedContent from "./components/DetailedContent";
import { useState } from "react";
// const reactDescriptions = ['Fundamental', 'Crucial', 'Core'];


function App() {
  const [selectedTopic, setSelectedTopic] = useState();
  function handleSelectedTab(selected) {
    setSelectedTopic(selected);
  }

  let tabContent = <p>You can select a tab above to see code examples</p>
  if (selectedTopic) {
    tabContent = <DetailedContent {...EXAMPLES[selectedTopic]} />
  }

  return (
    <div>
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Core Concepts</h2>
          <ul>
            {/* <CoreConcept
              title="Compnents"
              description="The core UI building block"
              image={componentsImg}
            />
            <CoreConcept
              title={CORE_CONCEPTS[1].title}
              description={CORE_CONCEPTS[1].description}
              image={CORE_CONCEPTS[1].image}
            />
            <CoreConcept {...CORE_CONCEPTS[2]} />
            <CoreConcept {...CORE_CONCEPTS[3]} /> */}
            {CORE_CONCEPTS.map((coreConcept) => (<CoreConcept key={coreConcept.title} {...coreConcept} />))}
          </ul>
        </section>
        <section id="examples">
          <h2>Examples</h2>
          <menu>
            <TabButton isSelected={selectedTopic === "components"} onSelect={() => { handleSelectedTab("components") }}>Component</TabButton>
            <TabButton isSelected={selectedTopic === "props"} onSelect={() => { handleSelectedTab("props") }}>Props</TabButton>
            <TabButton isSelected={selectedTopic === "jsx"} onSelect={() => { handleSelectedTab("jsx") }}>JSX</TabButton>
            <TabButton isSelected={selectedTopic === "state"} onSelect={() => { handleSelectedTab("state") }}>State</TabButton>
          </menu>
          {tabContent}
        </section>
      </main>
    </div>
  );
}

export default App;