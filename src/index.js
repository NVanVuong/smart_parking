import React from 'react';
import ReactDOM from 'react-dom/client';
import reduxStore from './redux';
import './index.css';
import App from '~/App';
import { Provider } from 'react-redux';
import { AuthProvider } from '~/hooks/auth';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';

const { store, persistor } = reduxStore();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </BrowserRouter>
        </PersistGate>
    </Provider>,
);
