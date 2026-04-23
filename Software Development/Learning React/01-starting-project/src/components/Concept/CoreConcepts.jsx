import { CoreConcept } from "./CoreConcept";
import { CORE_CONCEPTS } from "../../data";
// import { CORE_CONCEPTS, EXAMPLES } from "./data";

export default function CoreConcepts() {
    return (
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
    );
}