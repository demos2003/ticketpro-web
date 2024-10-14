import { DollarSign, Ticket, CalendarDays, Users } from "lucide-react";
import OverviewTable from "../../components/table/OverviewTable";
import React from "react";
import CreateEventForm from "../../components/form/CreateEventForm";

const cardData = [
  {
    title: "Total Revenue",
    icon: DollarSign, // Use the actual imported icon component
    value: "$24,780",
    change: "+15% from last month",
  },
  {
    title: "Tickets Sold",
    icon: Ticket,
    value: "1,429",
    change: "+5% from last month",
  },
  {
    title: "Active Events",
    icon: CalendarDays,
    value: "8",
    change: "2 new this month",
  },
  {
    title: "New Customers",
    icon: Users,
    value: "385",
    change: "+2% from last month",
  }
];


interface Column {
  id: string;
  label: string;
  align?: 'right' | 'left' | 'center';
}

const recentTicketSalesColumns: Column[] = [
  { id: 'event', label: 'Event' },
  { id: 'customer', label: 'Customer Name', align: 'left' },
  { id: 'amount', label: 'Amount Paid', align: 'left' },
];

const recentTicketSalesRows = [
  { event: 'Event 1', customer: 'John Doe', amount: '$100' },
  { event: 'Event 2', customer: 'Jane Smith', amount: '$150' },
  { event: 'Event 3', customer: 'Jonah Smith', amount: '$160' },
  // More rows...
];


const upcomingEventsColumns: Column[] = [
  { id: 'event', label: 'Event' },
  { id: 'date', label: 'Date', align: 'left' },
  { id: 'ticketsSold', label: 'Tickets Sold', align: 'left' },
];

const upcomingEventsRows = [
  { event: 'Event A', date: '2024-09-15', ticketsSold: "150 / 450" },
  { event: 'Event B', date: '2024-09-18', ticketsSold: "200 / 5,000" },
  { event: 'Event C', date: '2024-09-18', ticketsSold: "2,300 / 3,000" },
  // More rows...
];




const Overview = () => {
  return (
    <div className="p-6 max-w-[1280px]">
      <p className="font-bold text-[25px]">Overview</p>
      <div className="mt-10 grid grid-cols-4 gap-12">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-white border max-w-[270px] h-[150px] rounded-md box-border p-6 flex flex-col justify-between"
          >
            <div className="flex flex-row items-center justify-between pb-2 space-y-0">
              <p className="text-sm font-medium">{card.title}</p>
              {/* Render the dynamic icon */}
              {React.createElement(card.icon, { className: "w-4 h-4 text-gray-500 dark:text-gray-400" })}
            </div>
            <div>
              <p className="text-2xl font-bold">{card.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{card.change}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-between">
        <OverviewTable
          title="Recent Ticket Sales"
          columns={recentTicketSalesColumns}
          rows={recentTicketSalesRows}
        />

        {/* Instance for Upcoming Events */}
        <OverviewTable
          title="Upcoming Events"
          columns={upcomingEventsColumns}
          rows={upcomingEventsRows}
        />

      </div>
      <div>
        <CreateEventForm/>
      </div>
    </div>
  )
}

export default Overview;
