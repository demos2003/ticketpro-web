import { PlusCircle, Search } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import EventTable from "../../components/table/EventTable";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useGetEventsByVendorIdQuery, useCreateEventMutation } from "../../api/features/events/eventSlice";
import { useGetLocationsByVendorIdQuery } from "../../api/features/location/locationSlice";

interface Event {
  name: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  totalTicket: number;
  vipPercentage: number;
  VipTicketPrice: number;
  RegTicketPrice: number;
  image?: File;
  varyingTicketType: boolean;
  vendorId: string;
}



const Events = () => {
  const vendorId = localStorage.getItem('userId');
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);

  // Fetching events and locations
  const { data: eventsData, isError, isLoading } = useGetEventsByVendorIdQuery(vendorId);
  const { data: locationData, isLoading: isFetchingLocations } = useGetLocationsByVendorIdQuery(vendorId);

  // Mutation for creating event
  const [createEvent, { isLoading: isCreating }] = useCreateEventMutation();

  const [newEvent, setNewEvent] = useState<Event>({
    name: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    location: "",
    description: "",
    totalTicket: 0,
    vipPercentage: 50,
    VipTicketPrice: 0,
    varyingTicketType: true,
    RegTicketPrice: 0,
    vendorId: ""

  });

  const handlePercentageChange = (e: any) => {
    const Vip = parseInt(e.target.value);
    setNewEvent({
      ...newEvent,
      vipPercentage: Vip,
      varyingTicketType: Vip !== 0 && Vip !== 100
    });
  };

  const vipPercentage = newEvent.vipPercentage;
  const regularPercentage = 100 - vipPercentage;


  const convertTo24HourFormat = (time: string) => {
    const date = new Date(`1970-01-01T${time}`);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleImageChange = (e: any) => {
    setNewEvent({ ...newEvent, image: e.target.files[0] });
  };

  const handleAddEvent = async () => {
    const formData = new FormData();
  
    const formattedStartTime = convertTo24HourFormat(newEvent.startTime);
    const formattedEndTime = convertTo24HourFormat(newEvent.endTime);
    const vipTicketPrice = parseFloat(newEvent.VipTicketPrice.toString());
    const regTicketPrice = parseFloat(newEvent.RegTicketPrice.toString());
  
    const eventData = {
      name: newEvent.name,
      startDate: newEvent.startDate,
      endDate: newEvent.endDate,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      location: newEvent.location,
      description: newEvent.description,
      totalTicket: newEvent.totalTicket,
      Vip: newEvent.vipPercentage,
      VipTicketPrice: vipTicketPrice,
      RegTicketPrice: regTicketPrice,
      varyingTicketType: newEvent.vipPercentage === 100 || newEvent.vipPercentage === 0 ? false : true,
      vendorId: vendorId,
    };
  
    // Append event data
    formData.append('event', JSON.stringify(eventData));
  
    // Append image file and imageName if image exists
    if (newEvent.image) {
      formData.append('file', newEvent.image);
      formData.append('imageName', newEvent.image.name);  // Use the file name for imageName
    }
  
    // Debugging - log the formData entries
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
  
    // Attempt to create the event
    try {
      await createEvent(formData).unwrap();
      console.log('Event created successfully');
      setIsAddEventOpen(false);  // Close the dialog on success
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };
  

  return (
    <div className="p-6 max-w-[1280px]">
      <div className="flex flex-row justify-between">
        <p className="font-bold text-[25px]">Events</p>
        <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
          <DialogTrigger asChild>
            <div className="w-[200px] bg-black flex flex-row items-center justify-center h-[40px] rounded cursor-pointer">
              <PlusCircle className="mr-2 h-4 w-4 text-[white]" />
              <p className="text-[white]">Create Event</p>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
              <DialogDescription>Enter the details for the new event.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="eventName">Event Name</Label>
                <Input
                  id="eventName"
                  value={newEvent.name}
                  onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                  placeholder="Enter event name"
                />
              </div>
              <div className="flex justify-between" >
                <div className="space-y-2">
                  <Label htmlFor="startDate">Event Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newEvent.startDate}
                    onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value, endDate: e.target.value })}
                    placeholder="Select start date"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startTime">Event Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={newEvent.startTime}
                    onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                    placeholder="Select start time"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">Event End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={newEvent.endTime}
                    onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                    placeholder="Select end time"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="space-y-2 w-[48%]">
                  <Label htmlFor="totalTicket">Ticket Number</Label>
                  <Input
                    id="totalTicket"
                    value={newEvent.totalTicket}
                    onChange={(e) => setNewEvent({ ...newEvent, totalTicket: parseInt(e.target.value) })}
                    placeholder="Enter total number of tickets"
                  />
                </div>
                <div className="space-y-2 w-[48%]">
                  <Label htmlFor="eventLocation">Event Location</Label>
                  <Select
                    onValueChange={(value) => setNewEvent({ ...newEvent, location: value })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {isFetchingLocations ? (
                        <p>Loading locations...</p>
                      ) : locationData && locationData.length > 0 ? (
                        locationData.map((location: any) => (
                          <SelectItem key={location.id} value={location.stadiumName}>
                            {location.stadiumName}
                          </SelectItem>
                        ))
                      ) : (
                        <p>No locations available</p>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vipPercentage">VIP Tickets Percentage</Label>
                <input
                  id="vipPercentage"
                  type="range"
                  min="0"
                  max="100"
                  value={vipPercentage}
                  onChange={handlePercentageChange}
                  className="w-full h-[40px] px-[10px] mt-2 rounded placeholder:text-[12px]"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>VIP: {vipPercentage}%</span>
                  <span>Regular: {regularPercentage}%</span>
                </div>
              </div>
              <div className="flex row justify-between">
                <div className="space-y-2 w-[48%]">
                  <Label htmlFor="startTime">Vip Price</Label>
                  <Input
                    id="startTime"
                    value={newEvent.VipTicketPrice}
                    onChange={(e) => setNewEvent({ ...newEvent, VipTicketPrice: parseInt(e.target.value) })}
                    placeholder="N100,000"
                  />
                </div>
                <div className="space-y-2 w-[48%]">
                  <Label htmlFor="endTime">Regular Price</Label>
                  <Input
                    id="endTime"
                    value={newEvent.RegTicketPrice}
                    onChange={(e) => setNewEvent({ ...newEvent, RegTicketPrice: parseInt(e.target.value) })}
                    placeholder="N1,000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  placeholder="Enter event description"
                  className="w-full h-80px] p-[10px] mt-2 placeholder:text-[12px] border border-gray-300 rounded resize-none"
                />
              </div>
              <div className="space-y-2">
                <input
                  type="file"
                  id="image"
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <DialogFooter>
              <button
                className="bg-black text-white px-4 py-2 rounded"
                onClick={handleAddEvent}
                disabled={isCreating}
              >
                {isCreating ? 'Creating...' : 'Create Event'}
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-10 flex flex-row justify-between">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full sm:w-64 h-[40px] border border-gray-300 rounded"
          />
        </div>
        <div>
          <Select>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="status">Sort by Status</SelectItem>
              <SelectItem value="name">Sort by Name</SelectItem>
              <SelectItem value="date">Sort by Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {
        isError ? (
          <p className="text-red-500">Error loading events.</p>
        ) : (
          <EventTable data={eventsData} isLoading={isLoading} />

        )
      }

      {/* Event Table */}

    </div>
  );
};

export default Events;
