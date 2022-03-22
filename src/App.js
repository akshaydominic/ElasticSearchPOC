import AdminPage from './pages/AdminPage';
import Login from './pages/Login';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import AnalystPage from './pages/AnalystPage';
export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/login" element={<Login />} />
				<Route path="/admin/*" element={<AdminPage />} />
				<Route path="/analyst/*" element={<AnalystPage />} />
				<Route path="*" element={<AdminPage />} />
			</Routes>
		</BrowserRouter>
	);
}
