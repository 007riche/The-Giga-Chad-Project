import { useState } from "react";
import Tabs from "../Tabs";
import TabButton from "./TabButton"
import DetailedContent from "./DetailedContent";
import Section from "../Section";
import { EXAMPLES } from "../../data";

export default function Examples() {
    const [selectedTopic, setSelectedTopic] = useState();
    function handleSelectedTab(selected) {
        setSelectedTopic(selected);
    }

    let tabContent = <p>You can select a tab above to see code examples</p>
    if (selectedTopic) {
        tabContent = <DetailedContent {...EXAMPLES[selectedTopic]} />
    }

    return (
        <Section title="Examples" id="examples">
            <Tabs
                // containerElementTag="menu"
                buttons={
                    <>
                        <TabButton isSelected={selectedTopic === "components"} onClick={() => { handleSelectedTab("components") }}>Component</TabButton>
                        <TabButton isSelected={selectedTopic === "props"} onClick={() => { handleSelectedTab("props") }}>Props</TabButton>
                        <TabButton isSelected={selectedTopic === "jsx"} onClick={() => { handleSelectedTab("jsx") }}>JSX</TabButton>
                        <TabButton isSelected={selectedTopic === "state"} onClick={() => { handleSelectedTab("state") }}>State</TabButton>
                    </>
                }>
                {tabContent}
            </Tabs>
            {/* <menu> */}
            {/* <TabButton isSelected={selectedTopic === "components"} onSelect={() => { handleSelectedTab("components") }}>Component</TabButton> */}
            {/* <TabButton isSelected={selectedTopic === "props"} onSelect={() => { handleSelectedTab("props") }}>Props</TabButton> */}
            {/* <TabButton isSelected={selectedTopic === "jsx"} onSelect={() => { handleSelectedTab("jsx") }}>JSX</TabButton> */}
            {/* <TabButton isSelected={selectedTopic === "state"} onSelect={() => { handleSelectedTab("state") }}>State</TabButton> */}

            {/* <TabButton isSelected={selectedTopic === "components"} onClick={() => { handleSelectedTab("components") }}>Component</TabButton>
                <TabButton isSelected={selectedTopic === "props"} onClick={() => { handleSelectedTab("props") }}>Props</TabButton>
                <TabButton isSelected={selectedTopic === "jsx"} onClick={() => { handleSelectedTab("jsx") }}>JSX</TabButton>
                <TabButton isSelected={selectedTopic === "state"} onClick={() => { handleSelectedTab("state") }}>State</TabButton>

            </menu> */}
            {/* {tabContent} */}
        </Section>
    );
}