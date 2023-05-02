import { Routes, Route } from 'react-router-dom';
import { path } from '~/ultils/contains';
import { Admin, Home, Profile } from './contains/public';
import { RequireAuth } from '~/hooks/requireAuth';
function App() {
    return (
        <div className="w-screen">
            <Routes>
                <Route path={path.HOME} element={<Home />} />
                <Route
                    path={path.ADMIN}
                    element={
                        <RequireAuth>
                            <Admin />
                        </RequireAuth>
                    }
                />
                <Route path={path.PROFILE} element={<Profile />} />
            </Routes>
        </div>
    );
}

export default App;
