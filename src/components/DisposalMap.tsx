
import { Button } from "./Button";

const MapLocation = ({ name, distance, type, isActive = false }: { name: string; distance: string; type: string; isActive?: boolean }) => (
  <div className={`p-4 rounded-lg border ${isActive ? 'border-primary bg-primary/5' : 'border-border'} mb-3 cursor-pointer hover:border-primary/50 transition-all`}>
    <div className="flex items-center justify-between mb-1">
      <h4 className="font-medium">{name}</h4>
      <span className="text-sm text-muted-foreground">{distance}</span>
    </div>
    <div className="flex items-center">
      <span className="text-sm text-muted-foreground">{type}</span>
      {isActive && (
        <span className="ml-auto text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
          Selected
        </span>
      )}
    </div>
  </div>
);

const DisposalMap = () => {
  return (
    <section id="map" className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Find Disposal Locations</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Locate the nearest waste disposal bins and recycling centers to properly dispose of your items.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 rounded-xl overflow-hidden shadow-md h-[500px] relative">
    <iframe 
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d114610.55845054636!2d91.80316506723634!3d26.145235486627833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1741154979066!5m2!1sen!2sin" 
        width="100%" 
        height="100%" 
        style={{ border: 0, borderRadius: '8px' }} 
         
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade">
    </iframe>
</div>


          <div>
            <div className="bg-white rounded-xl p-5 shadow-md h-[500px] flex flex-col">
              <div className="border-b pb-4 mb-4">
                <div className="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search for locations"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              <div className="font-medium mb-3 flex items-center justify-between">
                <span>Nearby Locations</span>
                <span className="text-sm text-primary">Filter</span>
              </div>

              <div className="overflow-y-auto flex-1 pr-1 -mr-1">
                <MapLocation
                  name="The Assam Royal Global University"
                  distance="16 km"
                  type="All recyclables"
                  isActive={false}
                />
               <MapLocation
                  name="Girijananda Chowdhury University"
                  distance="45 m"
                  type="Paper, Plastic, Food Waste"
                  isActive={true}
                />
                 {/* <MapLocation
                  name="Central Mall Collection"
                  distance="0.8 miles"
                  type="Plastic, Aluminum"
                />
                <MapLocation
                  name="City Transfer Station"
                  distance="1.2 miles"
                  type="All waste types, Hazardous"
                />
                <MapLocation
                  name="Downtown Recycling"
                  distance="1.5 miles"
                  type="Paper, Cardboard, Plastic"
                /> */}
              </div>

              <div className="mt-4 pt-4 border-t">
                <Button className="w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4M12 16h.01" />
                  </svg>
                  Report New Location
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DisposalMap;
