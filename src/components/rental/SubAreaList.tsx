
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Home } from "lucide-react";
import { EstateHouses } from "./EstateHouses";

interface SubAreaListProps {
  area: string;
  subAreas: string[];
  onBack: () => void;
}

export const SubAreaList = ({ area, subAreas, onBack }: SubAreaListProps) => {
  const [selectedSubArea, setSelectedSubArea] = useState<string | null>(null);

  if (selectedSubArea) {
    return (
      <EstateHouses 
        area={area}
        subArea={selectedSubArea}
        onBack={() => setSelectedSubArea(null)}
      />
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="flex items-center space-x-2 self-start h-10 sm:h-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Areas</span>
        </Button>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{area} Sub-Areas</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {subAreas.length > 0 ? (
          subAreas.map((subArea, index) => (
            <Card 
              key={index}
              className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105 touch-manipulation"
              onClick={() => setSelectedSubArea(subArea)}
            >
              <CardHeader className="pb-2 p-3 sm:p-6 sm:pb-2">
                <CardTitle className="text-base sm:text-lg flex items-center space-x-2">
                  <Home className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                  <span className="truncate">{subArea}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0">
                <div className="space-y-2">
                  <p className="text-xs sm:text-sm text-gray-600">
                    Available houses and rooms
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full">
                      Active listings
                    </span>
                    <span className="text-xs text-gray-400">
                      Click to view →
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="col-span-full">
            <CardHeader className="p-3 sm:p-6">
              <CardTitle className="flex items-center space-x-2 text-base sm:text-xl">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                <span>{area} - General Area</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0">
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                This area has multiple housing options available.
              </p>
              <Button 
                onClick={() => setSelectedSubArea("General Area")}
                className="w-full bg-blue-500 hover:bg-blue-600 h-12 sm:h-auto"
              >
                View Available Houses
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
