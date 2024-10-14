import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Check,  X } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';

// Define the AdApplication type
type AdApplication = {
    id: number;
    placementId: number;
    advertiserName: string;
    companyDescription: string;
    status: 'pending' | 'accepted' | 'rejected';
};

const AdApplicationsTable: React.FC = () => {
    const [adApplications] = useState<AdApplication[]>([
        { id: 1, placementId: 1, advertiserName: "TechCorp", companyDescription: "Leading technology company", status: 'pending' },
        { id: 2, placementId: 2, advertiserName: "SportsGear", companyDescription: "Premium sports equipment", status: 'accepted' },
        { id: 3, placementId: 3, advertiserName: "LocalEats", companyDescription: "Local restaurant chain", status: 'rejected' },
        { id: 4, placementId: 1, advertiserName: "FitnessPro", companyDescription: "Fitness equipment and supplements", status: 'pending' },
        { id: 5, placementId: 2, advertiserName: "MusicStreamer", companyDescription: "Online music streaming service", status: 'accepted' },
    ]);

    // const handleAction = (application: AdApplication, action: 'accept' | 'reject') => {
    //     const updatedApplications = adApplications.map(app => 
    //         app.id === application.id ? { ...app, status: action === 'accept' ? 'accepted' : 'rejected' } : app
    //     );
    //     setAdApplications();
    // };

    const renderApplicationsTable = (status: 'pending' | 'accepted' | 'rejected') => {
        const filteredApplications = adApplications.filter(app => app.status === status);

        return (
            <Table aria-label="ad applications table">
                <TableHead>
                    <TableRow className="bg-gray-100">
                        <TableCell align="left">
                            <p className="font-semibold">Advertiser</p>
                        </TableCell>
                        <TableCell align="left">
                            <p className="font-semibold">Company Description</p>
                        </TableCell>
                        <TableCell align="left">
                            <p className="font-semibold">Status</p>
                        </TableCell>
                        <TableCell align="center">
                            <p className="font-semibold">Actions</p>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredApplications.length > 0 ? (
                        filteredApplications.map((application) => (
                            <TableRow key={application.id}>
                                <TableCell align="left">{application.advertiserName}</TableCell>
                                <TableCell align="left">{application.companyDescription}</TableCell>
                                <TableCell align="left">{application.status}</TableCell>
                                <TableCell align="center">
                                    {application.status === 'pending' && (
                                        <div className='flex flex-row relative left-20'>
                                            <div

                                                className="mr-2 flex flex-row justify-center bg-black rounded w-[120px] h-[40px] items-center "
                                            >
                                                <Check className="mr-2 h-4 w-4 text-[white]" />
                                                <p className='text-[white]'>Accept</p>
                                            </div>
                                            <div
                                                className="mr-2 flex flex-row justify-center bg-[red] rounded w-[120px] h-[40px] items-center "

                                            >
                                                <X className="mr-2 h-4 w-4 text-[white]" />
                                                <p className='text-[white]'>Reject</p>
                                            </div>
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} align="center">
                                No applications available for this status
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        );
    };

    return (
        <div className="border p-6 bg-white w-full mt-10 rounded-md">
            <p className="font-semibold text-[20px]">Ad Applications</p>
            <p className='text-[gray] text-[12px] mb-5'>Review and manage applications for ad placements</p>
            <Tabs defaultValue="pending" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="accepted">Accepted</TabsTrigger>
                    <TabsTrigger value="rejected">Rejected</TabsTrigger>
                </TabsList>
                <TabsContent value="pending">
                    {renderApplicationsTable('pending')}
                </TabsContent>
                <TabsContent value="accepted">
                    {renderApplicationsTable('accepted')}
                </TabsContent>
                <TabsContent value="rejected">
                    {renderApplicationsTable('rejected')}
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AdApplicationsTable;