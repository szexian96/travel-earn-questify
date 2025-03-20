
import React from 'react';
import { MapPin } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  type?: string;
}

interface MapComponentProps {
  locations: Location[];
  centerLat?: number;
  centerLng?: number;
  zoom?: number;
  onLocationClick?: (location: Location) => void;
  selectedLocationId?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ 
  locations, 
  centerLat = 37.7749, 
  centerLng = -122.4194, 
  zoom = 12,
  onLocationClick,
  selectedLocationId
}) => {
  // In a real app, you would implement this with Google Maps or Mapbox
  
  return (
    <div className="rounded-xl overflow-hidden bg-secondary/50 h-[400px] relative">
      <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
        <MapPin className="w-10 h-10 text-primary animate-pulse" />
        <div className="text-center max-w-xs px-4">
          <p className="text-sm font-medium mb-1">Map Integration</p>
          <p className="text-xs text-muted-foreground">
            In a production application, this would be integrated with Google Maps or Mapbox
            to show quest locations on a real map.
          </p>
        </div>
      </div>
      
      {/* This would be your map container */}
      <div id="map" className="w-full h-full"></div>
      
      {/* Sample location list for demo purposes */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-3 z-10 border-t border-border">
        <p className="text-sm font-medium mb-2">Sample Locations ({locations.length})</p>
        <div className="flex overflow-x-auto gap-2 pb-1">
          {locations.map((location) => (
            <div 
              key={location.id}
              className={`flex-shrink-0 rounded-md p-2 cursor-pointer transition-colors ${
                selectedLocationId === location.id 
                  ? 'bg-primary/10 border border-primary/30' 
                  : 'bg-secondary/80 border border-transparent hover:border-primary/20'
              }`}
              onClick={() => onLocationClick?.(location)}
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium whitespace-nowrap">{location.name}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
