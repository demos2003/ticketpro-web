import { CheckIcon, EyeIcon, EyeOffIcon, Ticket } from "lucide-react"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../api/features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setAuthState, setCredentials } from '../../api/features/auth/authSlice'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [rememberMe, setRememberMe] = useState(false)

    const toggleRememberMe = () => {
        setRememberMe(!rememberMe);
    };

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await login({ email, password }).unwrap();
            console.log(response)

            localStorage.setItem('accessToken', response.access_token);
            localStorage.setItem('emailVerified', 'true');

            dispatch(setCredentials({ email, password }));
            dispatch(setAuthState({
                isAuthenticated: true,
                accessToken: response.access_token,
                emailVerified: true,
                representativeName: response.representativeName,
                userId: response.userId,
                email: response.email
            }));
            navigate("dashboard")
        } catch (err) {
            setErrorMsg('Login failed. Please check your credentials.');
            console.error(err)
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
            <div className="mb-8 flex items-center space-x-2">
                <Ticket className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold">TicketDash</span>
            </div>
            <div className="bg-[white] w-[28%] border rounded p-[20px]">
                <p className="font-bold text-[25px]">Login to TicketDash</p>
                <p className="text-[#969696] text-[14px]">Enter your credentials to access the admin dashboard</p>
                <div className="mt-[30px]">
                    <div className="mb-[10px]">
                        <p className="text-[14px] text-[black] font-normal">Email</p>
                        <input placeholder="ladenas@gmail.com" className="border w-full h-[40px] px-[10px] mt-2 rounded placeholder:text-[12px]"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <p className="text-[14px] text-[black] font-normal">Password</p>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            className="border w-full h-[40px] px-[10px] mt-2 rounded placeholder:text-[12px]"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className="absolute right-3 top-[40.5px] transform "
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <EyeIcon className="h-4 w-4 text-[#969696]" /> : <EyeOffIcon className="h-4 w-4 text-[#969696]" />}
                        </button>
                    </div>

                </div>
                <div className="flex flex-row  h-4 mt-[15px] items-center">
                    <div className="w-4 h-4 border-2 border-black rounded flex items-center " onClick={toggleRememberMe}>
                        {rememberMe ? <CheckIcon className="text-[black]" /> : null}
                    </div>
                    <p className="ml-[5px] text-[14px] mt-[2px]">Remember me</p>
                </div>

                <div className="bg-[black] rounded w-full flex items-center justify-center mt-[30px] h-[40px] cursor-pointer" onClick={handleLogin}>
                    {
                        isLoading ? (
                            <p>Loading</p>
                        ) : (
                            <p className="text-[white]">Login</p>
                        )
                    }

                </div>
                <p className="text-[red] mt-3">{errorMsg}</p>

                <div className="flex flex-col items-center space-y-2 mt-[40px]">
                    <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                        Forgot your password?
                    </Link>
                    <p className="text-sm text-gray-500">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-blue-600 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>

    )
}

export default Login