import { PlusCircle } from "lucide-react";
import LocationTable from "../../components/table/LocationTable";
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
import { useState } from "react";
import { useRegisterLocationMutation, useGetLocationsByVendorIdQuery } from "../../api/features/location/locationSlice";


// Define LocationRow type
interface LocationRow {
  id: number;
  name: string;
  address: string;
  capacity: number;
}

const Location = () => {


  // State for new location form
  const [newLocation, setNewLocation] = useState<Omit<LocationRow, 'id'>>({
    name: '',
    address: '',
    capacity: 0,
  });
  const [isAddLocationOpen, setIsAddLocationOpen] = useState(false);

  const vendorId = localStorage.getItem('userId');

  const [registerLocation, { isLoading: isRegistering }] = useRegisterLocationMutation();
  const { data: locationData, isError, isLoading: isFetchingLocations } = useGetLocationsByVendorIdQuery(vendorId);

  const handleCreateLocation = async () => {
    try {
      const { name, address, capacity } = newLocation;
      const response = await registerLocation({
        vendorId,
        stadiumName: name,
        address,
        capacity,
      }).unwrap();
      console.log(response);
      setIsAddLocationOpen(false); // Close dialog on success
    } catch (error) {
      console.error("Error creating location:", error);
    }
  };


  return (
    <div className="p-6 max-w-[1280px]">
      <div className="flex flex-row justify-between items-center">
        <p className="font-bold text-[25px]">Locations</p>
        <Dialog open={isAddLocationOpen} onOpenChange={setIsAddLocationOpen}>
          <DialogTrigger asChild>
            <div className="w-[200px] bg-black flex flex-row items-center justify-center h-[40px] rounded cursor-pointer">
              <PlusCircle className="mr-2 h-4 w-4 text-[white]" />
              <p className='text-[white]'>Create Location</p>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Location</DialogTitle>
              <DialogDescription>Enter the details for the new location.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="locationName">Location Name</Label>
                <Input
                  id="locationName"
                  value={newLocation.name}
                  onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                  placeholder="Enter location name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="locationAddress">Address</Label>
                <Input
                  id="locationAddress"
                  value={newLocation.address}
                  onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
                  placeholder="Enter location address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="locationCapacity">Capacity</Label>
                <Input
                  id="locationCapacity"
                  type="number"
                  value={newLocation.capacity}
                  onChange={(e) => setNewLocation({ ...newLocation, capacity: parseInt(e.target.value) })}
                  placeholder="Enter location capacity"
                />
              </div>
            </div>
            <DialogFooter>
              <div
                className="cursor-pointer bg-black text-white p-2 rounded"
                onClick={handleCreateLocation}
              >
                {
                  isRegistering ? (
                    <p>Loading</p>
                  ) : (
                    <p>Add Location</p>
                  )
                }

              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        {
          isError ? (
            <p className="text-red-500">Error loading events.</p>
          ) : (
            <LocationTable
              locationData={locationData}
              isFetchingLocations={isFetchingLocations}

            />

          )
        }

      </div>
    </div>
  );
};

export default Location;
