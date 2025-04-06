export default function NotFoundPage() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                textAlign: "center",
                width: "100vw",
            }}
        >
            <h1>404 - Página não encontrada</h1>
            <p>Oops! Essa rota não existe.</p>
        </div>
    );
}