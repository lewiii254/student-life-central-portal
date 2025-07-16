
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, ChevronRight } from "lucide-react";

interface RentalAreaCardProps {
  area: string;
  subAreas: string[];
  onClick: () => void;
}

export const RentalAreaCard = ({ area, subAreas, onClick }: RentalAreaCardProps) => {
  return (
    <Card 
      className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105 touch-manipulation"
      onClick={onClick}
    >
      <CardHeader className="pb-2 p-3 sm:p-6 sm:pb-2">
        <CardTitle className="text-base sm:text-lg flex items-center justify-between">
          <div className="flex items-center space-x-2 min-w-0 flex-1">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
            <span className="truncate">{area}</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-6 pt-0">
        {subAreas.length > 0 ? (
          <div className="space-y-2">
            <p className="text-xs sm:text-sm text-gray-500 mb-2">
              {subAreas.length} sub-areas available
            </p>
            <div className="flex flex-wrap gap-1">
              {subAreas.slice(0, 3).map((subArea, index) => (
                <span 
                  key={index}
                  className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full"
                >
                  {subArea}
                </span>
              ))}
              {subAreas.length > 3 && (
                <span className="text-xs text-gray-400">
                  +{subAreas.length - 3} more
                </span>
              )}
            </div>
          </div>
        ) : (
          <p className="text-xs sm:text-sm text-gray-500">Multiple options available</p>
        )}
      </CardContent>
    </Card>
  );
};
