import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// Type definitions for column and row data
interface Column {
    id: string;
    label: string;
    align?: 'right' | 'left' | 'center';
}

interface OverviewTableProps {
    title: string;
    columns: Column[];
    rows: any[]; 
}

const OverviewTable: React.FC<OverviewTableProps> = ({ title, columns, rows }) => {
    return (
        <div className="border p-6 bg-white w-[590px] mt-10 rounded-md">
            <p className='font-semibold text-[20px]'>{title}</p>
            <Table aria-label="dynamic table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell key={column.id} align={column.align || 'left'}>
                               <p className='font-semibold'>{column.label}</p> 
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, rowIndex) => (
                        <TableRow key={rowIndex} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            {columns.map((column) => (
                                <TableCell key={column.id} align={column.align || 'left'}>
                                   <p className='font-medium'> {row[column.id]} </p>
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default OverviewTable;
