import { MadeWithDyad } from "@/components/made-with-dyad";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">Welcome to Your SQL Grader App</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Upload student assignments and compare them against model answers.
        </p>
        <div className="flex flex-col space-y-4">
          <Link to="/">
            <Button className="px-8 py-4 text-lg">Go to Assignment Grader</Button>
          </Link>
          <Link to="/sql-question">
            <Button variant="outline" className="px-8 py-4 text-lg">Try SQL Editor</Button>
          </Link>
          {/* Removed: <Link to="/help">
            <Button variant="outline" className="px-8 py-4 text-lg">Help</Button>
          </Link> */}
        </div>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;