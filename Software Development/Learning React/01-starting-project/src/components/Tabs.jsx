export default function Tabs({ children, buttons, containerElementTag = "div" }) {
    // Copying the received element in a variable or const with a name starting 
    // with a capital Letter is important to avoid treating the prop name as existing
    // component name or html element name, so catching upfront this substitution problem
    // or simply name the prop with a starting capital letter i.e. ContainerElementTag

    const ElemTag = containerElementTag;

    return (
        <>
            {/* <menu> */}
            <ElemTag>
                {buttons}
            </ElemTag>
            {/* </menu> */}
            {children}
        </>
    );
}