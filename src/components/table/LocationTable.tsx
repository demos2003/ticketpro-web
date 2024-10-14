import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Edit, Trash2 } from 'lucide-react';



interface LocationRow {
  id: number;
  stadiumName: string;
  capacity: number;
  address: string;
}

interface Column {
  id: keyof LocationRow;
  label: string;
  align?: 'left' | 'right' | 'center' | 'inherit' | 'justify';
}

const LocationTable: React.FC<{ locationData: LocationRow[]; isFetchingLocations: boolean }> = ({ locationData, isFetchingLocations }) => {
  const columns: Column[] = [
    { id: 'stadiumName', label: 'Location Name', align: 'left' },
    { id: 'capacity', label: 'Capacity', align: 'left' },
    { id: 'address', label: 'Address', align: 'left' },
  ];



  const handleEdit = (id: number) => {
    console.log('Edit location with id:', id);
  };

  const handleDelete = (id: number) => {
    console.log('Delete location with id:', id);
  };

  return (
    <div className="border bg-white w-full mt-10 rounded-md">
      {isFetchingLocations ? (
        < p className="text-center p-4">Loading events...</p>
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
            {locationData.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align || 'left'}>
                    <p className='font-medium'>{row[column.id]}</p>
                  </TableCell>
                ))}
                <TableCell align="center">
                  <div className="flex space-x-2 relative left-10">
                    <div className='border w-[40px] h-[40px] rounded flex items-center justify-center' onClick={() => handleEdit(row.id)}>
                      <Edit className="h-4 w-4" />
                    </div>
                    <div className='border w-[40px] h-[40px] rounded flex items-center justify-center' onClick={() => handleDelete(row.id)}>
                      <Trash2 className="h-4 w-4" />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )
      }
    </div >
  );
};

export default LocationTable;


// const locations: LocationRow[] = [
//   { id: 1, name: 'Stadium A', capacity: 50000, address: '123 Main St, City A' },
//   { id: 2, name: 'Arena B', capacity: 20000, address: '456 Maple Rd, City B' },
//   { id: 3, name: 'Convention Center C', capacity: 30000, address: '789 Oak Ave, City C' },
//   { id: 4, name: 'Stadium D', capacity: 40000, address: '101 Pine St, City D' },
//   { id: 5, name: 'Sports Complex E', capacity: 25000, address: '202 Elm St, City E' },
//   { id: 6, name: 'Theater F', capacity: 1000, address: '303 Cedar Blvd, City F' },
//   { id: 7, name: 'Exhibition Hall G', capacity: 1500, address: '404 Birch Ln, City G' }
// ];
