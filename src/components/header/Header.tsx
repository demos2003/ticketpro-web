import { LogOut } from "lucide-react"
import { logout } from "../../api/features/auth/authSlice";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";





const Header = () => {
    const repName = localStorage.getItem('representativeName');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const clearAccessToken = async () => {
        try {
            await localStorage.removeItem('accessToken');
            console.log('Access token cleared successfully');
        } catch (error) {
            console.error('Error clearing access token:', error);
        }
    };


    const handleLogout = async () => {
        try {
            await clearAccessToken();
            dispatch(logout());
            navigate("/")
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };





    return (
        <header className="flex items-center justify-between p-3 bg-[white] w-full border-b">
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            <div className="flex items-center">
                <span className="mr-4">
                    {repName}
                </span>
                <div className="hover:bg-gray-400 bg-gray-300 p-2 rounded cursor-pointer" onClick={() => handleLogout()}>
                    <LogOut className="h-5 w-5" />
                </div>
            </div>
        </header>
    )
}

export default Header