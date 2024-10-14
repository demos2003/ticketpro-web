import RevenueTrendChart from "./revenueGraph"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"

const RevenueTrendGraph = () => {
  return (
    <div className="border p-6 bg-[white] w-full mt-10 rounded-md">
        <div className="flex flex-row justify-between items-center mb-4">
          <p className="text-[18px] font-semibold">Revenue Trend</p>
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
        <RevenueTrendChart />
      </div>

    </div>
  )
}

export default RevenueTrendGraph