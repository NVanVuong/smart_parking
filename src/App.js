import { Routes, Route } from 'react-router-dom';
import { path } from '~/ultils/contains';
import { Admin, Home, Login } from './contains/public';
import { RequireAuth } from '~/hooks/requireAuth';
import Signup from './contains/public/Signup';
function App() {
    return (
        <div className="w-screen">
            <Routes>
                <Route path={path.HOME} element={<Home />} />
                <Route path={path.LOGIN} element={<Login />} />
                <Route path={path.SIGNUP} element={<Signup />} />
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
