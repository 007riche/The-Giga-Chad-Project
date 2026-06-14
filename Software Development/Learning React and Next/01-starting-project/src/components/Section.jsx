export default function Section({ title, children, ...remaininProps }) {
    return (
        <section {...remaininProps}>
            <h2>{title}</h2>
            {children}
        </section>
    );
}