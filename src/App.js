import { Routes, Route } from 'react-router-dom';
import { path } from '~/ultils/contains';
import { Home, Login } from './contains/public';

function App() {
    return (
        <div className="w-creen bg-primary">
            <Routes>
                <Route path={path.HOME} element={<Home />} />
                <Route path={path.LOGIN} element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
