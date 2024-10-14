import DailyTicketGraph from "../../components/graph/dailygraph/DailyTicketGraph";
import LocationAttendanceGraph from "../../components/graph/locationgraph/LocationAttendanceGraph";
import RevenueTrendGraph from "../../components/graph/revenuegraph/RevenueTrendGraph";
import TopEventsTable from "../../components/table/TopEventsTable";


const cardData = [
  {
    title: "Total Sales",
    description:"Number of tickets sold",
    value: "1,234",
    change: "+15% from last month",
  },
  {
    title: "Revenue",
    description:"Total revenue from ticket sales",
    value: "N14,429",
    change: "+5% from last month",
  },
  {
    title: "Average Ticket Price",
    description:"Average price per ticket sold",
    value: "N28",
    change: "2 new this month",
  },
];

const Reports = () => {
  return (
    <div className="p-6 max-w-[1280px]">
        <p className="font-bold text-[25px]">Reports</p>
        <div className="mt-10 grid grid-cols-3 gap-12">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-white border w-[380px] h-[200px] rounded-md box-border p-6 flex flex-col justify-between"
          >
            <div className="flex flex-col  pb-2 space-y-0">
              <p className="text-[25px] font-semibold">{card.title}</p>
              <p className="text-sm font-medium text-gray-500">{card.description}</p>
             
            </div>
            <div>
              <p className="text-2xl font-bold">{card.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{card.change}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-0 flex flex-row justify-between">
        <DailyTicketGraph/>
        <LocationAttendanceGraph/>

      </div>
      <div>
        <RevenueTrendGraph/>
      </div>
      <div>
        <TopEventsTable/>
      </div>
    </div>
  )
}

export default Reports