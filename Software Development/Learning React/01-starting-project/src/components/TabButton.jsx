export default function TabButton({ children, onSelect, isSelected }) {
    // injected by react. the children prop to manipulate the dom
    return (
        <li>
            <button className={isSelected ? "active" : undefined} onClick={onSelect}>{children}</button>
        </li>
    );
}