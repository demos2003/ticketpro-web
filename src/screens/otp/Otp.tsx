import { Loader2, Ticket } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Input } from '../../components/ui/input';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from "../../hooks/use-toast";
import { useValidateEmailMutation } from '../../api/features/auth/authApiSlice';

const OTP_LENGTH = 6;

const Otp = () => {
    const { toast } = useToast();
    const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [resendTimer, setResendTimer] = useState(30);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const location = useLocation();
    const { email } = location.state || {};
    const [validateOtp] = useValidateEmailMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendTimer]);

    const handleChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const otpString = otp.join('');
        if (otpString.length !== OTP_LENGTH) {
            setError('Please enter all digits of the OTP');
            setIsLoading(false);
            return;
        }

        try {
            const response = await validateOtp({ email, otp: otpString }).unwrap();
            if (response === 'otp is validotp is valid') {
                toast({
                    title: "Success",
                    description: "OTP verified successfully!",
                });
                navigate("/dashboard")
            } else {
                setError('Invalid OTP. Please try again.');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOTP = async () => {
        setResendTimer(30);
        // Here, you would call an API to resend the OTP
        toast({
            title: "OTP Resent",
            description: "A new OTP has been sent to your device.",
        });
        // Simulate an API call for resend (you should implement your actual API logic)
        await new Promise(resolve => setTimeout(resolve, 1500));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
            <div className="mb-8 flex items-center space-x-2">
                <Ticket className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold">TicketDash</span>
            </div>
            <div className="bg-white w-[28%] border rounded p-6">
                <p className="font-bold text-[25px]">Enter OTP</p>
                <p className="text-[#969696] text-[14px]">We've sent a {OTP_LENGTH}-digit code to {email}</p>
                <div className="flex justify-between mb-6 mt-10">
                    {otp.map((digit, index) => (
                        <Input
                            key={index}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            ref={(el) => inputRefs.current[index] = el}
                            className="w-12 h-12 text-center text-2xl"
                        />
                    ))}
                </div>
                {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
                <div className="text-sm text-center">
                    {resendTimer > 0 ? (
                        <p>Resend OTP in {resendTimer} seconds</p>
                    ) : (
                        <button onClick={handleResendOTP} className="text-blue-600">
                            Resend OTP
                        </button>
                    )}
                </div>
                <div className="w-full mt-10 bg-black h-[40px] rounded flex items-center justify-center cursor-pointer" onClick={handleSubmit}>
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />
                            <p className='text-white'> Verifying...</p>
                        </>
                    ) : (
                        <p className='text-white'>Verify OTP</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Otp;
