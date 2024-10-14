import React, { useState } from 'react';
import { Edit2, Plus, Trash2 } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
} from '@mui/material';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

const initialExpenses = [
    { id: 1, description: 'Venue Booking', amount: 5000, date: '2023-07-01', event: 'Kano pillars vs eagles' },
    { id: 2, description: 'Catering', amount: 3000, date: '2023-07-02', event: 'Kano pillars vs eagles' },
    { id: 3, description: 'Marketing', amount: 2000, date: '2023-07-03', event: 'Football Match 6' },
    { id: 4, description: 'Sound System', amount: 4000, date: '2023-07-04', event: 'Match 8' },
    { id: 5, description: 'Security', amount: 1500, date: '2023-07-05', event: 'Kano pillars vs eagles' },
];


interface ExpenseTableProps {
    selectedEvent: string; // Explicitly define the type
}

const ExpenseTable: React.FC<ExpenseTableProps> = ({ selectedEvent }) => {
    const [expenses] = useState(initialExpenses);

    // Filter expenses based on selected event
    const filteredExpenses = expenses.filter(expense => expense.event === selectedEvent);
    const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

    return (
        <div className="border p-6 bg-white w-full mt-10 rounded-md">
            <div>
                <p className="font-semibold text-[20px]">Expenses</p>
                <div className="flex flex-row justify-between items-baseline">
                    <p className='text-[gray] text-[12px] mb-5'>Manage expenses for the selected event</p>

                    <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
                        <DialogTrigger asChild>
                            <div className="cursor-pointer bg-black text-white p-2 rounded w-[200px] h-[40px] flex flex-row items-center justify-center">
                                <Plus className="mr-2 text-[15px]" />
                                <p className="text-[15px]">Add Expense</p>
                            </div>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Expense</DialogTitle>
                                <DialogDescription>Enter the details for the new expense.</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="eventName">Expense Name</Label>
                                    <Input
                                        id="expenseName"
                                        placeholder="Enter event name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="eventDate">Expense Date</Label>
                                    <Input
                                        id="expenseDate"
                                        type="date"
                                        placeholder="Select expense date"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="totalTicket">Expense Amount</Label>
                                    <Input
                                        id="expenseAmount"
                                        placeholder="Enter expense amount"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <div
                                    className="cursor-pointer bg-black text-white p-2 rounded"
                                >
                                    Add Event
                                </div>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Description</TableCell>
                        <TableCell>
                            <TableSortLabel>
                                Amount
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredExpenses.map((expense) => (
                        <TableRow key={expense.id}>
                            <TableCell>{expense.description}</TableCell>
                            <TableCell>{expense.amount}</TableCell>
                            <TableCell>{expense.date}</TableCell>
                            <TableCell className=''>
                                <div className='flex flex-row '>
                                    <div onClick={() => alert(`Edit ${expense.description}`)} className='mr-4 border rounded p-2'>
                                        <Edit2 className="h-4 w-4" />
                                    </div>
                                    <div onClick={() => alert(`Delete ${expense.description}`)} className='mr-4 border rounded p-2'>
                                        <Trash2 className="h-4 w-4" />
                                    </div>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className='flex flex-row justify-between mt-10'>
                <p className='text-[18px] font-semibold'>Total Expense</p>
                <p className='text-[18px] font-semibold'>N10,000.00</p>
            </div>

        </div >
    );
};

export default ExpenseTable;
