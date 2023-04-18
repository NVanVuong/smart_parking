import { Routes, Route } from 'react-router-dom';
import { path } from '~/ultils/contains';
import { Admin, Home, Login } from './contains/public';
import { RequireAuth } from '~/hooks/requireAuth';
function App() {
    return (
        <div className="bg-primary w-screen">
            <Routes>
                <Route path={path.HOME} element={<Home />} />
                <Route path={path.LOGIN} element={<Login />} />
                <Route
                    path={path.ADMIN}
                    element={
                        <RequireAuth>
                            <Admin />
                        </RequireAuth>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
