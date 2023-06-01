import React from "react";
import ReactDOM from "react-dom/client";
import './components/i18n';
import {
    BrowserRouter,
    Routes,
    HashRouter,
    Route
} from "react-router-dom";

import MainPage from "./components/main_page"
import UpperElements from "./components/upper_elements"
import Clients from "./components/clients/clients"
import Client from "./components/clients/client"
import NewClient from "./components/clients/new_client"
import ClientEdit from "./components/clients/client_edit"
import TypesOfKeys from "./components/types_of_keys/types_of_keys"
import TypeOfKeyNew from "./components/types_of_keys/type_of_key_new"
import TypeOfKeyEdit from "./components/types_of_keys/type_of_key_edit"
import ProductKeyNew from "./components/product_keys/product_keys_new"
import ClientKeys from "./components/product_keys/client_keys"
import ProductKeys from "./components/product_keys/product_keys"
import ProductKeyEdit from "./components/product_keys/product_key_edit"




function App() {

    localStorage.setItem('loadingClientKeys', true);
    localStorage.setItem('loadingKeys', true);

    return (
        <div>
            <UpperElements />
            
            <BrowserRouter>
            <Routes>
            
                <Route path="*" element={<MainPage />} />
                <Route path="clients/" element={<Clients />} />
                <Route path="clients/:id" element={<Client />} />
                <Route path="clients/new" element={<NewClient />} />
                <Route path="clients/:id/edit" element={<ClientEdit />} />
                <Route path="types_of_keys/" element={<TypesOfKeys />} />
                <Route path="types_of_keys/new" element={<TypeOfKeyNew />} />
                <Route path="types_of_keys/:id/edit" element={<TypeOfKeyEdit />} />
                <Route path="clients/:client_id/product_keys/new" element={<ProductKeyNew />} />
                <Route path="clients/:client_id/product_keys" element={<ClientKeys />} />
                <Route path="clients/:client_id/product_keys/:id/edit" element={<ProductKeyEdit />} />
                <Route path="product_keys/" element={<ProductKeys />} />
            </Routes>
            </BrowserRouter>
        </div>
    )
}

// Add some javascript to replace the div where = 'places-list-container'
// with com=ntent render above

const app = ReactDOM.createRoot(document.getElementById("App"));
app.render(<App />);