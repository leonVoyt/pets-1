"use client";
import { useState, useEffect, useMemo, ChangeEvent } from "react";
import { PetCard } from "./components/PetsCard";
import axios from "axios";
import { DetailedDog } from "./types/dog/type";
import { DetailedCat } from "./types/cat/type";
import Spinner from "./components/Spinner";

export interface Pet {
  id: string;
  name: string;
  url: string;
  [key: string]: any;
}

interface Dog extends Pet, DetailedDog {}

interface Cat extends Pet, DetailedCat {}

export default function Home() {
  const [pets, setPets] = useState<Dog[]>([]);
  const [filteredPets, setFilteredPets] = useState<Dog[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const [cats, setCats] = useState<Cat[]>([]);

  const fetchDogs = async (): Promise<void> => {
    try {
      const { data } = await axios.get<{ result: Dog[] }>("/api/dog");
      if (!data.result.length) return;
      setPets(data.result);
    } catch (error) {
      console.error("Failed to fetch dogs:", error);
    }
  };

  const fetchCats = async (): Promise<void> => {
    try {
      const { data } = await axios.get<{ result: Cat[] }>("/api/cat");
      if (!data.result.length) return;
      setCats(data.result);
    } catch (error) {
      console.error("Failed to fetch cats:", error);
    }
  };

  const fetchData = async (): Promise<void> => {
    try {
      await Promise.all([fetchDogs(), fetchCats()]);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    setIsLoad(true);
    fetchData().finally(() => setIsLoad(false));
  }, []);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const term = event.target.value;
    setSearchTerm(term);
  };

  const dogsArr = useMemo(() => pets, [pets.length]);
  const catsArr = useMemo(() => cats, [cats.length]);

  return (
    <div className="pets-container p-8">
      <input
        type="text"
        placeholder="Search breeds..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-8 p-2 border border-gray-300 rounded w-full"
      />
      {isLoad ? (
        <Spinner />
      ) : (
        <div className="flex flex-col md:flex-row w-full space-x-0 md:space-x-8">
          <div className="flex-1 flex flex-col items-center">
            <h2 className="mb-11 text-4xl text-center md:text-left">Dogs</h2>
            <div className="flex-1 flex flex-wrap gap-4 justify-center">
              {dogsArr.length > 0 ? (
                dogsArr
                  .filter((pet) => {
                    return pet.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase());
                  })
                  .map((pet, index) => (
                    <PetCard
                      key={index}
                      pet={pet}
                      petType={"dog"}
                      isClickable
                    />
                  ))
              ) : (
                <p className="text-gray-600">No dogs available</p>
              )}
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center mt-8 md:mt-0">
            <h2 className="mb-11 text-4xl text-center md:text-left">Cats</h2>
            <div className="flex-1 flex flex-wrap gap-4 justify-center">
              {catsArr.length > 0 ? (
                catsArr
                  .filter((pet) => {
                    return pet.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase());
                  })
                  .map((pet, index) => (
                    <PetCard
                      key={index}
                      pet={pet}
                      isClickable
                      petType={"cat"}
                    />
                  ))
              ) : (
                <p className="text-gray-600">No cats available</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
