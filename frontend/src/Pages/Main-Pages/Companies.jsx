import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Companies = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/companies") {
      navigate("overview", { replace: true });
    }
  }, [location.pathname, navigate]);

  return null;
};