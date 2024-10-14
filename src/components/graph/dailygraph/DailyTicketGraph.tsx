import DailySalesChart from "./dailyGraph"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"

const DailyTicketGraph = () => {
  return (
    <div className="border p-6 bg-white w-[590px] mt-10 rounded-md">
        <div className="flex flex-row justify-between items-center mb-4">
          <p className="text-[18px] font-semibold">Daily Ticket Sales</p>
          <Select>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sort by " />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Sort by Status</SelectItem>
              <SelectItem value="dark">Sort by Name</SelectItem>
              <SelectItem value="system">Sort by Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
      <div className="bg-gray-100 py-2 pt-6">
        <DailySalesChart />
      </div>

    </div>
  )
}

export default DailyTicketGraph