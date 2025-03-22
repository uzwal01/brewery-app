import React from "react";
import BreweryList from "./BreweryList";

const App = () => {
  return (
    <div className="flex justify-center">
      <div className="w-[1200px]">
        <h1 className="text-2xl font-bold text-center p-4">Brewery Finder</h1>
        <div className="p-4">
          <BreweryList />
        </div>
      </div>
    </div>
  );
};

export default App;
