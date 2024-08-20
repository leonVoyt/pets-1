"use client";

import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { PetCard } from "@/app/components/PetsCard";
import { Pet } from "@/app/page";
import Spinner from "@/app/components/Spinner";

export default function Page() {
  const router = useRouter();

  const [pet, setPet] = useState<Pet | null>(null);
  const [petImages, setPetImages] = useState<Pet[]>([]);
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const { id } = useParams();

  const fetchDogs = async () => {
    if (!id) return;
    try {
      // Fetch pet details
      const { data } = await axios.get(`/api/dog/dogInfo/${id}`);
      setPet(data.result);

      // Fetch images based on breed ID
      const images = await axios.get(
        `/api/dog/dogByBreed/${data.result.beradId}`
      );
      setPetImages(images.data.result);
    } catch (error) {
      console.error("Failed to fetch dogs:", error);
    } finally {
      setIsLoad(false);
    }
  };
  const dogsArr = useMemo(() => petImages, [petImages.length]);

  useEffect(() => {
    setIsLoad(true);
    fetchDogs();
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
            <p className="mb-2">
              <strong>ID:</strong> {pet?.id}
            </p>
            <p className="mb-2">
              <strong>Breed ID:</strong> {pet?.beradId}
            </p>
            <p className="mb-2">
              <strong>Weight:</strong> {pet?.weight?.imperial} lbs /{" "}
              {pet?.weight?.metric} kg
            </p>
            <p className="mb-2">
              <strong>Height:</strong> {pet?.height?.imperial} inches /{" "}
              {pet?.height?.metric} cm
            </p>
            <p className="mb-2">
              <strong>Breed Group:</strong> {pet?.breed_group}
            </p>
            <p className="mb-2">
              <strong>Life Span:</strong> {pet?.life_span}
            </p>
            <p className="mb-2">
              <strong>Name:</strong> {pet?.name}
            </p>
            <p>
              <strong>Temperament:</strong> {pet?.temperament}
            </p>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="flex flex-wrap gap-6">
              {isLoad ? (
                <p className="text-center text-gray-600">Loading images...</p>
              ) : (
                dogsArr.map((pet, index) => <PetCard key={index} pet={pet} />)
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
