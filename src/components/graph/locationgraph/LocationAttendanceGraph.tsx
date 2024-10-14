import StadiumAttendanceRadarChart from './locationGraph'

const LocationAttendanceGraph = () => {
    return (
        <div className="border p-6 bg-white w-[590px] mt-10 rounded-md">
            <div className=" mb-4">
                <p className="text-[18px] font-semibold">Location Attendance</p>
            </div>
            <div className="bg-gray-100 py-2 pt-6">
                <StadiumAttendanceRadarChart />
            </div>
        </div>

    )
}

export default LocationAttendanceGraph