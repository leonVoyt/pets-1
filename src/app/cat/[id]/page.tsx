"use client";

import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { PetCard } from "@/app/components/PetsCard";
import { Pet } from "@/app/page";
import Spinner from "@/app/components/Spinner";

// Define types for pet data

export default function Page() {
  const router = useRouter();
  const { id } = useParams(); // Use string type for id

  const [pet, setPets] = useState<Pet | null>(null);
  const [petImages, setPetImages] = useState<Pet[]>([]);
  const [isLoad, setIsLoad] = useState<boolean>(true);

  const fetchPets = async () => {
    if (!id) return;
    try {
      const { data } = await axios.get(`/api/cat/catInfo/${id}`);
      const images = await axios.get(
        `/api/cat/catByBreed/${data.result.beradId}`
      );
      setPetImages(images.data.result);
      return data.result;
    } catch (error) {
      console.error("Failed to fetch cats:", error);
    }
  };
  const catsArr = useMemo(() => petImages, [petImages.length]);
  useEffect(() => {
    setIsLoad(true);
    fetchPets()
      .then((data) => setPets(data))
      .finally(() => setIsLoad(false));
  }, [id]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <button
        className="bg-cyan-500 text-white py-2 px-4 rounded-lg shadow-md mb-6 hover:bg-cyan-600 transition-colors"
        onClick={() => router.back()}
      >
        Back
      </button>
      {isLoad ? (
        <Spinner />
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Details:</h3>
            <h2 className="mb-2">
              <strong>Name:</strong> {pet?.name || "Unknown"}
            </h2>
            <p className="mb-2">
              <strong>Weight:</strong> {pet?.weight?.imperial} lbs /{" "}
              {pet?.weight?.metric} kg
            </p>

            <p className="mb-2">
              <strong>Breed Group:</strong> {pet?.breed_group || "Unknown"}
            </p>
            <p className="mb-2">
              <strong>Life Span:</strong> {pet?.life_span || "Unknown"}
            </p>
            <p className="mb-2">
              <strong>Temperament:</strong> {pet?.temperament || "Unknown"}
            </p>
            <p className="mb-2">
              <strong>Origin:</strong> {pet?.origin || "Unknown"}
            </p>
            <p className="mb-2">
              <strong>Description:</strong>{" "}
              {pet?.description || "No description available"}
            </p>
            <p className="mb-2">
              <strong>Indoor:</strong> {pet?.indoor ? "Yes" : "No"}
            </p>
            <p className="mb-2">
              <strong>Lap Cat:</strong> {pet?.lap ? "Yes" : "No"}
            </p>
            <p className="mb-2">
              <strong>Alternate Names:</strong> {pet?.alt_names || "None"}
            </p>
            {/* Add more fields as needed */}
            <p className="mb-2 overflow-hidden">
              <strong>Wikipedia URL:</strong>{" "}
              <a
                href={pet?.wikipedia_url}
                className="text-cyan-500 text-ellipsis"
                target="_blank"
                rel="noopener noreferrer"
              >
                {pet?.wikipedia_url || "No URL"}
              </a>
            </p>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="flex flex-wrap gap-6">
              {isLoad ? (
                <p className="text-center text-gray-600">Loading images...</p>
              ) : (
                catsArr.map((image) => <PetCard key={image.id} pet={image} />)
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
