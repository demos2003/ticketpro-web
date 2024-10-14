import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


interface Column {
    id: string;
    label: string;
    align?: 'right' | 'left' | 'center';  
}

interface EventRow {
    eventName: string;
    ticketsSold: string;
    revenue: string;
}

const columns: Column[] = [
    { id: 'eventName', label: 'Event' },
    { id: 'ticketsSold', label: 'Tickets Sold', align: 'left' },
    { id: 'revenue', label: 'Revenue', align: 'left' },
];

const topEvents: EventRow[] = [
    { eventName: 'Concert A', ticketsSold: '500', revenue: 'N10,000' },
    { eventName: 'Festival B', ticketsSold: '300', revenue: 'N6,000' },
    { eventName: 'Conference C', ticketsSold: '450', revenue: 'N8,500' },
    { eventName: 'Festival B', ticketsSold: '300', revenue: 'N6,000' },
    { eventName: 'Conference C', ticketsSold: '450', revenue: 'N8,500' },
    { eventName: 'Festival B', ticketsSold: '300', revenue: 'N6,000' },
    { eventName: 'Conference C', ticketsSold: '450', revenue: 'N8,500' },
];

const TopEventsTable: React.FC = () => {
    return (
        <div className="border p-6 bg-white w-full mt-10 rounded-md">
              <p className='font-semibold text-[20px] mb-5'>Top Selling Events</p>
                <Table aria-label="top events table">
                    <TableHead>
                        <TableRow className='bg-gray-100'>
                            {columns.map((column) => (
                                <TableCell key={column.id} align={column.align || 'left'}>
                                    <p className='font-semibold'>{column.label}</p>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {topEvents.map((row, rowIndex) => (
                            <TableRow key={rowIndex} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                {columns.map((column) => (
                                    <TableCell key={column.id} align={column.align || 'left'}>
                                        <p className='font-medium'>{row[column.id as keyof EventRow]}</p>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
        </div>
    );
};

export default TopEventsTable;
