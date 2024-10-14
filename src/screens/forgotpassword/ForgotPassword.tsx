import { useState } from 'react'
import { Ticket, EyeIcon, EyeOffIcon } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        if (!email) {
            setError('Please enter your email address')
            setIsLoading(false)
            return
        }

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500))
            setIsSuccess(true)
            navigate('/otp')

        } catch (error) {
            setError('An error occurred. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
            <div className="mb-8 flex items-center space-x-2">
                <Ticket className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold">TicketDash</span>
            </div>

            <div className="bg-[white] w-[28%] border rounded p-[20px]">
                {isSuccess ? (
                    <div>
                        <p className="font-bold text-[25px]">Forgot Password</p>
                        <p className="text-[#969696] text-[14px] mb-5">Enter your email to reset your password</p>
                        <div className="bg-green-100 p-4 rounded mb-4">
                            <p className="text-green-600 font-bold">Success</p>
                            <p className="text-green-600 text-sm">
                                If an account exists for {email}, you will receive password reset OTP.
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        <p className="font-bold text-[25px]">Forgot Password</p>
                        <p className="text-[#969696] text-[14px]">Enter your email to reset your password</p>
                        <form onSubmit={handleSubmit}>
                            <div className="mt-[30px]">
                                <div className="mb-[10px]">
                                    <p className="text-[14px] text-[black] font-normal">Email</p>
                                    <input
                                        placeholder="ladenas@gmail.com"
                                        className="border w-full h-[40px] px-[10px] mt-2 rounded placeholder:text-[12px]"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            {error && (
                                <div className="bg-red-100 p-2 mt-2 rounded mb-2">
                                    <p className="text-red-600 font-bold">Error</p>
                                    <p className="text-red-600 text-sm">{error}</p>
                                </div>
                            )}
                            <div className="relative">
                                <p className="text-[14px] text-[black] font-normal">New Password</p>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    className="border w-full h-[40px] px-[10px] mt-2 rounded placeholder:text-[12px]"
                                />
                                <button
                                    className="absolute right-3 top-[40.5px] transform"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <EyeIcon className="h-4 w-4 text-[#969696]" /> : <EyeOffIcon className="h-4 w-4 text-[#969696]" />}
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="bg-[black] rounded w-full flex items-center justify-center mt-[30px] h-[40px]"
                                disabled={isLoading}

                            >
                                <p className="text-[white]">{isLoading ? 'Sending...' : 'Reset Password'}</p>
                            </button>
                        </form>
                    </>
                )}
                <div className="flex flex-col items-center space-y-2 mt-[40px]">
                    <Link to="/" className="text-black hover:underline">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
