import { Link } from "react-router-dom";

const DM = [
    { productId: 'vefd-dfvdfvd-vd', title: "Parmigiano" },
    { productId: 'vevdf-dfvdx-cvcd', title: "Carbonarra" },
    { productId: 'h-jhbyu-b-bfc-j-hgv', title: "Gorgonzola" },
    { productId: 'rtrrt-rgr-bb-d', title: "Ketchup barbecue" },
    { productId: 'ff-gfg-fgf-gd', title: "Pizza" },
]

function ProductPage() {
    return (
        <div>
            <p>Welcome to the menu page</p>
            {DM.map((item) => (
                <li key={item.productId}>
                    <Link to={`${item.productId}/details`}>{item.title}</Link>
                </li>
            ))}
        </div>
    );
}

export default ProductPage;