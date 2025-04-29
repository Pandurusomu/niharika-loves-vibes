
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lavender/20 to-soft-peach/20">
      <div className="text-center glass p-8 rounded-xl max-w-md">
        <h1 className="text-4xl font-serif font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! This page doesn't exist in Niharika's world</p>
        <Button asChild className="btn-lavender">
          <Link to="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
