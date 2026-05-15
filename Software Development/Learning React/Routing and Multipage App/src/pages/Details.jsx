import { useParams } from "react-router-dom";

function DetailsPage() {
    const params = useParams();

    return (
        <>

            <h1>Details page for  {params.productId} </h1>
        </>
    );
}
export default DetailsPage;