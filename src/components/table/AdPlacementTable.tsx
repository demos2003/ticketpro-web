import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '../ui/select'; // Ensure this is the path to your custom Select components
import { Edit2, PlusCircle, Trash2 } from 'lucide-react';
import { initialPlacements } from '../../utils/initialPlacements';


const AdPlacementsTable: React.FC = () => {
    const [placements] = useState(initialPlacements);

    // Set default selections for the location and event filters
    const [selectedLocation, setSelectedLocation] = useState(placements[0].locationName);
    const [selectedEvent, setSelectedEvent] = useState(placements[0].events[0]?.eventName || '');

    // Update selected event whenever selected location changes
    useEffect(() => {
        const events = placements.find(
            (location) => location.locationName === selectedLocation
        )?.events;

        if (events && events.length > 0) {
            setSelectedEvent(events[0].eventName);
        }
    }, [selectedLocation, placements]);

    // Find the events based on the selected location
    const filteredEvents = placements.find(
        (location) => location.locationName === selectedLocation
    )?.events;

    // Find the placements based on the selected event
    const filteredPlacements = filteredEvents?.find(
        (event) => event.eventName === selectedEvent
    )?.placements;


    return (
        <div className="border p-6 bg-white w-full mt-10 rounded-md">
            <p className="font-semibold text-[20px] ">Ad Placements Locations</p>
            <p className='text-[gray] text-[12px] mb-5'>Manage ad placements for this event</p>

            {/* Filter controls */}
            <div className='flex flex-row justify-between'>
                <div className="flex space-x-4 mb-5">
                    {/* Location Filter */}
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Select Location" />
                        </SelectTrigger>
                        <SelectContent>
                            {placements.map((location, index) => (
                                <SelectItem key={index} value={location.locationName}>
                                    {location.locationName}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Event Filter */}
                    <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Select Event" />
                        </SelectTrigger>
                        <SelectContent>
                            {filteredEvents?.map((event, index) => (
                                <SelectItem key={index} value={event.eventName}>
                                    {event.eventName}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                </div>
                <div className="w-[200px] bg-black flex flex-row items-center justify-center h-[40px] rounded">
                    <PlusCircle className="mr-2 h-4 w-4 text-[white]" />
                    <p className='text-[white]'>Create Placement</p>
                </div>
            </div>

            {/* Table */}
            <Table aria-label="ad placements table">
                <TableHead>
                    <TableRow className="bg-gray-100">
                        <TableCell align="left">
                            <p className="font-semibold">Ad Type</p>
                        </TableCell>
                        <TableCell align="left">
                            <p className="font-semibold">Price</p>
                        </TableCell>
                        <TableCell align="center">
                            <p className="font-semibold">Actions</p>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredPlacements && filteredPlacements.length > 0 ? (
                        filteredPlacements.map((placement, placementIndex) => (
                            <TableRow key={placementIndex}>
                                <TableCell align="left">{placement.adType}</TableCell>
                                <TableCell align="left">{placement.price}</TableCell>
                                <TableCell align="center">
                                <div className='flex flex-row '>
                                    <div  className='mr-4 border rounded p-2'>
                                        <Edit2 className="h-4 w-4" />
                                    </div>
                                    <div className='mr-4 border rounded p-2'>
                                        <Trash2 className="h-4 w-4" />
                                    </div>
                                </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3} align="center">
                                No placements available for this event
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdPlacementsTable;
