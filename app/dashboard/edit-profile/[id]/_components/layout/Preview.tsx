import { MapPin, Link } from 'lucide-react';

export function Preview() {
  return (
    <>
      <div className="bg-zinc-800 rounded-[40px] p-4 mx-auto max-w-[300px] aspect-[9/19]">
        <div className="bg-zinc-200 rounded-[32px] h-full p-4 text-black">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-bold">Raul Cano</h3>
              <p className="text-xs flex items-center">
                <MapPin className="w-3 h-3 mr-1" /> Lisbon
              </p>
            </div>
            <div className="bg-green-500 text-white p-1 rounded-full">
              <Link className="w-4 h-4" />
            </div>
          </div>
          <p className="text-sm mb-4">Bio</p>
          {/* {startups.map(startup => startup.active && (
                  <div key={startup.id} className="bg-white rounded-lg p-3 mb-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold">{startup.name}</h4>
                      <span className="text-xs">{startup.price}</span>
                    </div>
                    <p className="text-xs text-gray-600">{startup.description}</p>
                  </div>
                ))} */}
        </div>
      </div>
      <p className="text-center mt-4 text-zinc-400 text-sm">
        Preview of your Hitmeto. Deploy to go live ✨
      </p>
      <p className="text-center mt-2 text-zinc-400 text-sm">hitme.to/raulcano</p>
    </>
  );
}
