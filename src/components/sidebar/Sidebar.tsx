import { BarChart, CalendarDays, DollarSign, LayoutDashboard, MapPin, Megaphone, Settings, Ticket, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
    const location = useLocation();
    
    // Function to determine if a link is active
    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="w-[15%] h-screen flex flex-col justify-between border-r">
            <div>
                <div className="flex items-center justify-center h-16 bg-gray-900">
                    <Ticket className="h-8 w-8 text-white" />
                    <span className="ml-2 text-xl font-bold text-white">TicketDash</span>
                </div>
                <nav className="mt-8">
                    <div className="px-4">
                        <Link
                            to=""
                            className={`w-full flex items-center justify-start mb-4 p-2 rounded ${
                                isActive("/dashboard") ? "bg-gray-300 text-gray-900" : "text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            Dashboard
                        </Link>
                        <Link
                            to="events"
                            className={`w-full flex items-center justify-start mb-4 p-2 rounded ${
                                isActive("/dashboard/events") ? "bg-gray-300 text-gray-900" : "text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            <CalendarDays className="mr-2 h-4 w-4" />
                            Events
                        </Link>
                        <Link
                            to="tickets"
                            className={`w-full flex items-center justify-start mb-4 p-2 rounded ${
                                isActive("/dashboard/tickets") ? "bg-gray-300 text-gray-900" : "text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            <Ticket className="mr-2 h-4 w-4" />
                            Tickets
                        </Link>
                        <Link
                            to="customers"
                            className={`w-full flex items-center justify-start mb-4 p-2 rounded ${
                                isActive("/dashboard/customers") ? "bg-gray-300 text-gray-900" : "text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            <Users className="mr-2 h-4 w-4" />
                            Customers
                        </Link>
                        <Link
                            to="reports"
                            className={`w-full flex items-center justify-start mb-4 p-2 rounded ${
                                isActive("/dashboard/reports") ? "bg-gray-300 text-gray-900" : "text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            <BarChart className="mr-2 h-4 w-4" />
                            Reports
                        </Link>
                        <Link
                            to="location"
                            className={`w-full flex items-center justify-start mb-4 p-2 rounded ${
                                isActive("/dashboard/location") ? "bg-gray-300 text-gray-900" : "text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            <MapPin className="mr-2 h-4 w-4" />
                            Location
                        </Link>
                        <Link
                            to="adplacement"
                            className={`w-full flex items-center justify-start mb-4 p-2 rounded ${
                                isActive("/dashboard/adplacement") ? "bg-gray-300 text-gray-900" : "text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            <Megaphone className="mr-2 h-4 w-4" />
                            Ad Placements
                        </Link>
                        <Link
                            to="event-expense"
                            className={`w-full flex items-center justify-start mb-4 p-2 rounded ${
                                isActive("/dashboard/event-expense") ? "bg-gray-300 text-gray-900" : "text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            <DollarSign className="mr-2 h-4 w-4" />
                            Event Expenses
                        </Link>
                        <Link
                            to="settings"
                            className={`w-full flex items-center justify-start mb-4 p-2 rounded ${
                                isActive("/dashboard/settings") ? "bg-gray-300 text-gray-900" : "text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                        </Link>
                    </div>
                </nav>
            </div>
            <div className="border-2 w-[90%] ml-[5%] mb-4 h-[90px] rounded-xl flex flex-row items-center px-2 bg-gray-900">
                <div className="h-[px] w-[65px] border-2 rounded-full p-3 bg-white ">
                    <img src="/assets/images/LagosLogo.png" alt="Lagos State Logo"/>
                </div>
                <p className="text-white text-[16px] font-semibold ml-[10px]">Lagos State</p>
            </div>
        </div>
    );
}

export default Sidebar;
