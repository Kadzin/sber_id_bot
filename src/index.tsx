import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import SendPage from "./pages/SendPage/SendPage";
import GroupsPage from "./pages/GroupsPage/GroupsPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import {Provider} from "react-redux";
import {setupStore} from "./store/store";
import MessagesPage from "./pages/MessagesPage/MessagesPage";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = setupStore()

// prod basename: basename="/SberID/bot/web/"
// dev basename: basename="/test/build/"

root.render(
    <Provider store={store}>
        <BrowserRouter basename="/SberID/bot/web/">
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<SendPage />} />
                    <Route path="send" element={<SendPage />} />
                    <Route path="groups" element={<GroupsPage />} />
                    <Route path="users" element={<AdminPage />} />
                    <Route path="messages" element={<MessagesPage />} />
                    <Route path="*" element={"404"} />
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>
);