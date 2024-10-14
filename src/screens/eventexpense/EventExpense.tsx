import { useState } from 'react';
import ExpenseTable from "../../components/table/ExpenseTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const EventExpense = () => {
  const [selectedEvent, setSelectedEvent] = useState('Kano pillars vs eagles');

  return (
    <div className='p-6 max-w-[1280px]'>
      <div className="flex flex-row justify-between">
        <p className='font-bold text-[25px]'>Event Expenses</p>
        <Select onValueChange={setSelectedEvent}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder={selectedEvent} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Kano pillars vs eagles">Kano pillars vs eagles</SelectItem>
            <SelectItem value="Football Match 6">Football Match 6</SelectItem>
            <SelectItem value="Match 8">Match 8</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-4">
        <p className="text-[gray] text-[22px] font-extralight">City Arena - 2023-07-15</p>
      </div>
      <div>
        <ExpenseTable selectedEvent={selectedEvent} />
      </div>
    </div>
  );
};

export default EventExpense;
