
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to login page
    navigate("/");
  }, [navigate]);
  
  return null; // This won't actually render as we redirect immediately
}
