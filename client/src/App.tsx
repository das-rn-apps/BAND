// App.tsx or routes.tsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminLogin from './pages/Login';

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<AdminLogin />} />
  </Routes>
);

export default App;
