// export default function TabButton({ children, onSelect, isSelected }) {
export default function TabButton({ children, isSelected, ...props }) {
    // injected by react. the children prop to manipulate the dom
    return (
        <li>
            {/* <button className={isSelected ? "active" : undefined} onClick={onSelect}>{children}</button> */}
            <button className={isSelected ? "active" : undefined} {...props}>{children}</button>
        </li>
    );
}