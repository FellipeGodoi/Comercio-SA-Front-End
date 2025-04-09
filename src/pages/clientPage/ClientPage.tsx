import {useParams} from "react-router-dom";

export default function ClientPage() {
    const { id } = useParams();

    return (
        <>
            <h1>ID do Cliente: {id}</h1>
        </>
    );
}