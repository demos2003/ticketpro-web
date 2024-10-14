import { PlusCircle, Search } from "lucide-react"
import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import CustomerTable from "../../components/table/CustomerTable"

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <div className="p-6 max-w-[1280px]">
      <div className="flex flex-row justify-between">
        <p className="font-bold text-[25px]">Customer</p>
        <div className="w-[200px] bg-black flex flex-row items-center justify-center h-[40px] rounded">
          <PlusCircle className="mr-2 h-4 w-4 text-[white]" />
          <p className='text-[white]'>Create Customer</p>
        </div>
      </div>
      <div className="mt-10 flex flex-row justify-between">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search customer..."
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
        <CustomerTable/>
      </div>

    </div>
  )
}

export default Customers