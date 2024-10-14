// EventTable.tsx
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Edit, Trash2 } from 'lucide-react';

interface EventRow {
  id: string;
  name: string;
  description: string;
  location: string;
  startDate: string;     
  endDate: string;      
  startTime: string;     
  endTime: string;      
  totalTicket: number;
  soldTickets: number | null; // Change to allow null
  vipTicketPrice: number;
  regTicketPrice: number;
  status?: string; // Optional status to be determined dynamically
}

type Column = {
  id: keyof EventRow; // Ensure the id corresponds to keys in EventRow
  label: string;
  align: 'left' | 'center' | 'right' | 'justify' | 'inherit'; // Explicitly define align type
};

// EventTable component
const EventTable: React.FC<{ data: EventRow[]; isLoading: boolean }> = ({ data, isLoading }) => {
  const columns: Column[] = [
    { id: 'name', label: 'Event Name', align: 'left' },
    { id: 'location', label: 'Location', align: 'left' },
    { id: 'startDate', label: 'Start Date', align: 'left' },
    { id: 'totalTicket', label: 'Total Tickets', align: 'left' },
    { id: 'soldTickets', label: 'Sold Tickets', align: 'left' },
    { id: 'vipTicketPrice', label: 'VIP Price', align: 'left' },
    { id: 'regTicketPrice', label: 'Regular Price', align: 'left' },
    { id: 'status', label: 'Status', align: 'left' },
  ];

  const handleEdit = (id: string) => {
    console.log('Edit event with id:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Delete event with id:', id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-200 text-green-800';
      case 'Upcoming':
        return 'bg-yellow-200 text-yellow-800';
      case 'Completed':
        return 'bg-gray-200 text-gray-800';
      default:
        return '';
    }
  };

  // Get current date
  const currentDate = new Date();

  const getStatus = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (currentDate < start) {
      return 'Upcoming'; // Event has not started yet
    } else if (currentDate >= start && currentDate <= end) {
      return 'Active'; // Event is currently active
    } else {
      return 'Completed'; // Event has ended
    }
  };

  return (
    <div className="border bg-white w-full mt-10 rounded-md">
      {isLoading ? (
        <p className="text-center p-4">Loading events...</p>
      ) : (
        <Table aria-label="dynamic table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align || 'left'}>
                  <p className='font-semibold'>{column.label}</p>
                </TableCell>
              ))}
              <TableCell align="center">
                <p className='font-semibold'>Actions</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => {
              // Determine the status based on dates
              const status = getStatus(row.startDate, row.endDate);
              return (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align || 'left'}>
                      {column.id === 'soldTickets' ? (
                        row.soldTickets === null ? '0' : row.soldTickets
                      ) : column.id === 'vipTicketPrice' || column.id === 'regTicketPrice' ? (
                        row[column.id] === 0 ? 'Free' : row[column.id]
                      ) : column.id === 'status' ? (
                        <span className={`rounded-full p-2 h-[10px] text-[10px] ${getStatusColor(status)}`}>
                          {status}
                        </span>
                      ) : (
                        <p className='font-medium'>{row[column.id]}</p>
                      )}
                    </TableCell>
                  ))}
                  <TableCell align="center">
                    <div className="flex space-x-2 relative left-4">
                      <div className='border w-[40px] h-[40px] rounded flex items-center justify-center' onClick={() => handleEdit(row.id)}>
                        <Edit className="h-4 w-4" />
                      </div>
                      <div className='border w-[40px] h-[40px] rounded flex items-center justify-center' onClick={() => handleDelete(row.id)}>
                        <Trash2 className="h-4 w-4" />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default EventTable;
