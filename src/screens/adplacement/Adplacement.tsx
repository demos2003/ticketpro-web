import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string"; // To parse the query parameters
import LocationsTab from "../../components/tabs/adplacement/LocationsTab";
import RequestsTab from "../../components/tabs/adplacement/RequestsTab";

type Tab = "locations" | "requests"; // Define valid tab types

const validTabs: Tab[] = ["locations", "requests"];

const Adplacement = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Parse query parameters
  const queryParams = useMemo(() => queryString.parse(location.search), [location.search]);

  // Check if the current tab from queryParams is valid, otherwise default to 'locations'
  const activeTab = (validTabs.includes(queryParams.tab as Tab) ? queryParams.tab : "locations") as Tab;

  useEffect(() => {
    // If no valid tab is in the query params, set the default to 'locations'
    if (!queryParams.tab || !validTabs.includes(queryParams.tab as Tab)) {
      navigate({
        pathname: location.pathname,
        search: `?tab=locations`,
      });
    }
  }, [location.pathname, navigate, queryParams]);

  // Function to switch tabs
  const setActiveTab = (tab: Tab) => {
    navigate({
      pathname: location.pathname,
      search: `?tab=${tab}`,
    });
  };

  return (
    <div className="p-6 max-w-[1280px]">
      <p className="font-bold text-[25px]">Ad Placements</p>

      <div className="flex flex-row w-[320px] justify-between mt-10">
        <div
          onClick={() => setActiveTab("locations")}
          className={`cursor-pointer p-2 ${activeTab === "locations" ? "bg-white rounded-xl border" : ""}`}
        >
          <p>Ad Locations</p>
        </div>
        <div
          onClick={() => setActiveTab("requests")}
          className={`cursor-pointer p-2 ${activeTab === "requests" ? "bg-white rounded-xl border" : ""}`}
        >
          <p>Placement Requests</p>
        </div>
      </div>

      <div className="mt-10">
        {/* Conditionally render the tab based on activeTab */}
        {activeTab === "locations" && <LocationsTab />}
        {activeTab === "requests" && <RequestsTab />}
      </div>
    </div>
  );
};

export default Adplacement;
