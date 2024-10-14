import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"




interface TicketRow {
  ticketId: number;
  userName: string;
  purchaseDate: string;
  ticketType: 'Regular' | 'VIP';
  price: string;
  status: 'used' | 'unused' | 'refunded' | 'revoked';
}

// Define the type for each column (without 'actions')
interface Column {
  id: keyof TicketRow;
  label: string;
  align?: 'left' | 'right' | 'center' | 'inherit' | 'justify';
}


const getStatusColor = (status: string) => {
  switch (status) {
    case 'used':
      return 'bg-green-200 text-green-800'; // Example color for Active
    case 'unused':
      return 'bg-yellow-200 text-yellow-800'; // Example color for Upcoming
    case 'refunded':
      return 'bg-gray-200 text-gray-800';
    case 'revoked':
      return 'bg-red-200 text-red-800'; // Example color for Completed
    default:
      return '';
  }
};



const TicketsTable: React.FC = () => {
  const columns: Column[] = [
    { id: 'ticketId', label: 'Ticket Id', align: 'left' },
    { id: 'userName', label: 'Name', align: 'left' },
    { id: 'purchaseDate', label: 'Purchase Date', align: 'left' },
    { id: 'ticketType', label: 'Ticket Type', align: 'left' },
    { id: 'price', label: 'Price', align: 'left' },
    { id: 'status', label: 'Status', align: 'left' }
  ];


  const rows: TicketRow[] = tickets;

  return (
    <div className="border bg-white w-full mt-10 rounded-md">
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
          {rows.map((row) => (
            <TableRow key={row.ticketId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align || 'left'}>
                  {
                    column.id === 'status' ? (
                      <span className={`rounded-full p-2 h-[10px] text-[10px] ${getStatusColor(row.status)}`}>
                        {row[column.id]}
                      </span>
                    ) : (
                      <p className='font-medium'>{row[column.id]}</p>
                    )
                  }

                </TableCell>
              ))}
              <TableCell align="right" className='flex items-center justify-center'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="hover:bg-gray-300 p-2 rounded w-[40px] flex items-center justify-center bg-gray-200 relative left-10">
                      <MoreHorizontal className="h-4 w-4" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View Ticket</DropdownMenuItem>
                    <DropdownMenuItem>Refund Ticket</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Revoke Ticket</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default TicketsTable;


const tickets: TicketRow[] = [
  { ticketId: 1, userName: 'John Doe', purchaseDate: '2023-07-10', ticketType: 'VIP', price: '150', status: 'unused' },
  { ticketId: 2, userName: 'Jane Smith', purchaseDate: '2023-07-12', ticketType: 'Regular', price: '80', status: 'used' },
  { ticketId: 3, userName: 'Alice Johnson', purchaseDate: '2023-08-01', ticketType: 'VIP', price: '120', status: 'unused' },
  { ticketId: 4, userName: 'Bob Brown', purchaseDate: '2023-08-10', ticketType: 'Regular', price: '60', status: 'used' },
  { ticketId: 5, userName: 'Charlie Green', purchaseDate: '2023-09-01', ticketType: 'VIP', price: '200', status: 'unused' },
  { ticketId: 6, userName: 'Diana Prince', purchaseDate: '2023-06-20', ticketType: 'Regular', price: '50', status: 'used' },
  { ticketId: 7, userName: 'Bruce Wayne', purchaseDate: '2023-10-15', ticketType: 'VIP', price: '180', status: 'unused' },
  { ticketId: 8, userName: 'Clark Kent', purchaseDate: '2023-06-25', ticketType: 'Regular', price: '45', status: 'used' },
  { ticketId: 9, userName: 'Lois Lane', purchaseDate: '2023-10-20', ticketType: 'VIP', price: '170', status: 'unused' },
  { ticketId: 10, userName: 'Peter Parker', purchaseDate: '2023-09-10', ticketType: 'Regular', price: '100', status: 'refunded' },
  { ticketId: 11, userName: 'Tony Stark', purchaseDate: '2023-11-05', ticketType: 'VIP', price: '250', status: 'revoked' }
];





