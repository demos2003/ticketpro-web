import { PlusCircle } from 'lucide-react'
import { useState } from 'react'


const CreateEventForm = () => {
    const [vipPercentage, setVipPercentage] = useState(20)
    const [regularPercentage, setRegularPercentage] = useState(80)

    const handlePercentageChange = (e:any) => {
        const newVipPercentage = parseInt(e.target.value, 10)
        setVipPercentage(newVipPercentage)
        setRegularPercentage(100 - newVipPercentage)
    }
    return (
            <div className="mt-10 bg-white border p-6 rounded-md">
                <div className='mb-4'>
                    <p className='font-semibold text-[20px]'>Create New Event</p>
                </div>
                <div>
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label htmlFor="name">Event Name</label>
                                <input id="name" placeholder="Enter event name" className='border border-gray-300 w-full h-[40px] px-[10px] mt-2 rounded placeholder:text-[12px]' />
                            </div>
                            <div>
                                <label htmlFor="date">Event Date</label>
                                <input id="date" type="date" className='border border-gray-300 w-full h-[40px] px-[10px] mt-2 rounded placeholder:text-[12px]' />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="description">Event Description</label>
                            <textarea
                                id="description"
                                placeholder="Enter event description"
                                rows={4}
                                className='border border-gray-300 w-full h-[120px] p-[10px] mt-2 rounded placeholder:text-[12px]'
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label htmlFor="tickets">Total Tickets</label>
                                <input id="tickets" type="number" placeholder="Enter total number of tickets" className='border border-gray-300 w-full h-[40px] px-[10px] mt-2 rounded placeholder:text-[12px]' />
                            </div>
                            <div>
                                <label htmlFor="vip-percentage">VIP Tickets Percentage</label>
                                <input
                                    id="vip-percentage"
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={vipPercentage}
                                    onChange={handlePercentageChange}
                                    className=' w-full h-[40px] px-[10px] mt-2 rounded placeholder:text-[12px]'
                                />
                                <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    <span>VIP: {vipPercentage}%</span>
                                    <span>Regular: {regularPercentage}%</span>
                                </div> 
                            </div>
                        </div>
                        <div className="w-full bg-black flex flex-row items-center justify-center h-[40px] rounded">
                            <PlusCircle className="mr-2 h-4 w-4 text-[white]" />
                            <p className='text-[white]'>Create Event</p>
                        </div>
                    </form>
                </div>
            </div>
    )
}

export default CreateEventForm