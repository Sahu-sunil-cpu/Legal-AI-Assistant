
import { Button } from "@/components/ui/button";
import { Gavel } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="py-4 px-4 bg-black/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Gavel className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">LexiAssist</h1>
            <p className="text-xs text-gray-400">AI Legal Assistant</p>
          </div>
        </Link>
        
        <nav className="flex items-center space-x-6">
          <Link 
            to="/" 
            className={`text-gray-300 hover:text-cyan-400 transition-colors font-medium ${
              currentPath === "/" ? "text-cyan-400" : ""
            }`}
          >
            Home
          </Link>
          <Link 
            to="/assistant" 
            className={`text-gray-300 hover:text-cyan-400 transition-colors font-medium ${
              currentPath === "/assistant" ? "text-cyan-400" : ""
            }`}
          >
            AI Assistant
          </Link>
          <Link to="/assistant">
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-300">
              Get Started
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
