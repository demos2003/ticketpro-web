import { Search } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import { useState } from "react"
import TicketsTable from "../../components/table/TicketsTable"

const Tickets = () => {
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <div className="p-6 max-w-[1280px]">
      <p className="font-bold text-[25px]">Tickets</p>
      <div className="mt-10 flex flex-row justify-between">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full sm:w-64 h-[40px] border border-gray-300 rounded"
          />
        </div>
        <div>
          <Select>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Sort by " />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Sort by Status</SelectItem>
              <SelectItem value="dark">Sort by Name</SelectItem>
              <SelectItem value="system">Sort by Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <TicketsTable/>
      </div>

    </div>
  )
}

export default Tickets