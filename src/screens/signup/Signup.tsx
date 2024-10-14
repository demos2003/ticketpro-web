import { EyeIcon, EyeOffIcon, Ticket } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../../api/features/auth/authApiSlice";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isRepNameFocused, setIsRepNameFocused] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')

    const navigate = useNavigate();

    // Form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [representativeName, setRepName] = useState('');
    const [state, setState] = useState('');
    const role = "ORGANIZER";
    const organizerType = "ORGANIZATION";
    const organizationType = "PUBLIC";


    // Form validation errors
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [signUp, { isLoading}] = useSignUpMutation();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
        // Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Clear previous errors
        setEmailError('');
        setPasswordError('');

        // Validate inputs
        if (!validateEmail(email)) {
            setEmailError('Invalid email format');
            return;
        }

        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 8 characters long, include an uppercase, lowercase, and a number.');
            return;
        }

        // Prepare data for sign-up
        const formData = {
           
            password,
            role,
            organizerType,
            organizationType,
            state,
            phoneNumber,
            representativeName,
            email,
        };

        try {
            console.log(formData)
            const response = await signUp(formData).unwrap();
            console.log('SignUp Response:', response);
            if (response.message === "User already exists") {
                setErrorMsg("Something went wrong")   
            } else {
                if(response.access_token){
                    await localStorage.setItem('accessToken', response.access_token);
                    navigate("/otp", { state: { email } });
                }
            }
        } catch (err) {
            console.error("Sign-up error:", err);
            setErrorMsg('Something went wrong');
        }
    };

    const statesInNigeria = [
        "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", 
        "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", 
        "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", 
        "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "FCT"
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
            <div className="mb-8 flex items-center space-x-2">
                <Ticket className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold">TicketDash</span>
            </div>
            <div className="bg-[white] w-[28%] border rounded p-[20px]">
                <p className="font-bold text-[25px]">Sign up to TicketDash</p>
                <p className="text-[#969696] text-[14px]">Create your account to access the admin dashboard</p>
                <form onSubmit={handleSubmit}>
                    <div className="mt-[30px] space-y-4">
                        <div>
                            <p className="text-[14px] text-[black] font-normal">Email</p>
                            <input
                                type="email"
                                placeholder="ladenas@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border w-full h-[40px] px-[10px] mt-2 rounded placeholder:text-[12px]"
                            />
                            {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
                        </div>
                        <div>
                            <p className="text-[14px] text-[black] font-normal">Phone Number</p>
                            <input
                                placeholder="08012345678"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="border w-full h-[40px] px-[10px] mt-2 rounded placeholder:text-[12px]"
                            />
                        </div>
                        <div>
                            <p className="text-[14px] text-[black] font-normal">Representative Name</p>
                            <input
                                placeholder="John Doe"
                                value={representativeName}
                                onChange={(e) => setRepName(e.target.value)}
                                className="border w-full h-[40px] px-[10px] mt-2 rounded placeholder:text-[12px]"
                                onFocus={() => setIsRepNameFocused(true)}
                                onBlur={() => setIsRepNameFocused(false)}
                            />
                            {isRepNameFocused && (
                                <div className="text-sm text-gray-500 mt-1">
                                    Please input your last name first.
                                </div>
                            )}
                        </div>
                        <div>
                            <p className="text-[14px] text-[black] font-normal">State</p>
                            <select
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                className="border w-full h-[40px] px-[10px] mt-2 rounded"
                            >
                                <option value="">Select your state</option>
                                {statesInNigeria.map((state) => (
                                    <option key={state} value={state}>
                                        {state}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="relative">
                            <p className="text-[14px] text-[black] font-normal">Password</p>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border w-full h-[40px] px-[10px] mt-2 rounded placeholder:text-[12px]"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-[40.5px] transform"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <EyeIcon className="h-4 w-4 text-[#969696]" />
                                ) : (
                                    <EyeOffIcon className="h-4 w-4 text-[#969696]" />
                                )}
                            </button>
                            {passwordError && <p className="text-red-500 text-xs">{passwordError}</p>}
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-[black] rounded w-full flex items-center justify-center mt-[30px] h-[40px] text-white"
                    >
                        {isLoading ? 'Signing up...' : 'Sign up'}
                    </button>
                </form>
                {errorMsg && <p className="text-red-500 mt-2">Error: {errorMsg || "Sign-up failed."}</p>}
                <div className="flex flex-col items-center space-y-2 mt-[40px]">
                    <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                        Forgot your password?
                    </Link>
                    <p className="text-sm text-gray-500">
                        Already have an account?{" "}
                        <Link to="/" className="text-blue-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
