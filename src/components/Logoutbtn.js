import { useNavigate } from 'react-router-dom';
import './logoutbtn.css';
export default function Logoutbtn() {
	const navigate = useNavigate();
	const HandleClick = () => {
		navigate('/login');
	};
	return (
		<div className='logout'>
			<button onClick={HandleClick}>Sign out</button>
		</div>
	);
}
