import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "./Spinner";
import { Pet } from "../page";

// Define the type for the component props
interface PetCardProps {
  pet: Pet;
  isClickable?: boolean;
  petType?: string;
}

// Define the PetCard component with TypeScript types
export const PetCard: React.FC<PetCardProps> = ({
  pet,
  isClickable = false,
  petType = "",
}) => {
  const router = useRouter();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div
      className="border-2 border-gray-300 shadow-lg rounded-lg flex w-96 h-80 cursor-pointer flex-col items-center hover:shadow-2xl transition-shadow duration-300 ease-in-out bg-white transform hover:scale-105"
      onClick={() => isClickable && router.push(`/${petType}/${pet.id}`)}
    >
      <div className="relative flex items-center justify-center overflow-hidden w-full h-5/6 p-4 rounded-t-lg bg-gray-100 transition-transform duration-300 ease-in-out">
        {!isImageLoaded && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1,
            }}
          >
            <Spinner />
          </div>
        )}
        <Image
          src={pet.url}
          alt={pet.name}
          width={160}
          height={160}
          quality={100}
          priority={true}
          className={`w-full h-full object-cover rounded-lg ${
            isImageLoaded ? "block" : "hidden"
          }`}
          onLoad={() => setIsImageLoaded(true)}
        />
      </div>
      {pet.name && isImageLoaded && (
        <div className="mt-4 text-center text-lg font-semibold text-gray-700 transition-colors duration-300 ease-in-out hover:text-gray-900">
          {pet.name}
        </div>
      )}
    </div>
  );
};
