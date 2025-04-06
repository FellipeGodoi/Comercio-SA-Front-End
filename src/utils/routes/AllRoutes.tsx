import {BrowserRouter, Route, Routes} from "react-router-dom";
import ListClientsPage from "../../pages/listClientsPage/ListClientsPage.tsx";
import ClientPage from "../../pages/clientPage/ClientPage.tsx";
import NotFoundPage from "../../pages/notFoundPage/NotFoundPage.tsx";

export default function AllRoutes () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ListClientsPage/>}/>
                <Route path="/client/:id" element={<ClientPage/>}/>
                <Route path="*" element={<NotFoundPage/>} />
            </Routes>
        </BrowserRouter>
    )
}