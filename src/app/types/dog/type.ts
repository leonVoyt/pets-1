export interface Breed {
  id: string;
  weight: {
    imperial: string;
    metric: string;
  };
  height: {
    imperial: string;
    metric: string;
  };
  breed_group?: string;
  life_span?: string;
  name?: string;
  temperament?: string;
}

export interface DogImage {
  id: string;
  url: string;
  breeds: Breed[];
}

export interface DetailedDog {
  id: string;
  beradId: string;
  weight: {
    imperial: string;
    metric: string;
  };
  height: {
    imperial: string;
    metric: string;
  };
  breed_group?: string; // Make optional
  life_span?: string; // Make optional
  name: string;
  url: string;
  lifeSpan?: string; // Make optional
  temperament?: string; // Make optional
}
