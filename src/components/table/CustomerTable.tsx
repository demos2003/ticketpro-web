import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import InitialsBadge from '../badge/IntitalsBadge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "../ui/dropdown-menu"
import { MoreHorizontal } from 'lucide-react';

// Define the type for the customer rows
interface CustomerRow {
    id: number;
    name: string;
    email: string;
    totalPurchases: number;
    totalSpent: number;
    lastPurchase: string;
}

// Define the type for each column
interface Column {
    id: keyof CustomerRow;
    label: string;
    align?: 'left' | 'right' | 'center' | 'inherit' | 'justify';
}

// CustomerTable component
const CustomerTable: React.FC = () => {
    const columns: Column[] = [
        { id: 'name', label: 'Customer', align: 'left' },
        { id: 'email', label: 'Email', align: 'left' },
        { id: 'totalPurchases', label: 'Total Purchases', align: 'left' },
        { id: 'totalSpent', label: 'Total Spent', align: 'left' },
        { id: 'lastPurchase', label: 'Last Purchase', align: 'left' }
    ];

    const rows: CustomerRow[] = customers;

    // const handleEdit = (id: number) => {
    //     console.log('Edit customer with id:', id);
    // };

    // const handleDelete = (id: number) => {
    //     console.log('Delete customer with id:', id);
    // };

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
                        <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            {columns.map((column) => (
                                <TableCell key={column.id} align={column.align || 'left'}>
                                    {column.id === 'name' ? (
                                        <div className="flex items-center">
                                            <InitialsBadge name={row[column.id]} />
                                            <p className='font-medium'>{row[column.id]}</p>
                                        </div>
                                    ) : (
                                        <p className='font-medium'>{row[column.id]}</p>
                                    )}
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
                                        <DropdownMenuItem>View Details</DropdownMenuItem>
                                        <DropdownMenuItem>Ticket History</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>Block User</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default CustomerTable;

// Example customer data
const customers: CustomerRow[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', totalPurchases: 5, totalSpent: 150.00, lastPurchase: '2023-09-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', totalPurchases: 3, totalSpent: 80.50, lastPurchase: '2023-08-22' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', totalPurchases: 10, totalSpent: 320.75, lastPurchase: '2023-09-10' },
    { id: 4, name: 'Bob Brown', email: 'bob@example.com', totalPurchases: 2, totalSpent: 60.00, lastPurchase: '2023-07-30' },
    { id: 5, name: 'Charlie Green', email: 'charlie@example.com', totalPurchases: 1, totalSpent: 25.00, lastPurchase: '2023-09-01' }
];
