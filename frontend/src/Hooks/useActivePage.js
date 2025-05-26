import { useLocation } from "react-router-dom";

export const useActivePage = () => {
    const location = useLocation();

    // Extract the last segment of the URL path
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const activeTab = pathSegments[pathSegments.length - 1];

    return activeTab;
};