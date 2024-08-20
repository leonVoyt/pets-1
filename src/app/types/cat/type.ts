export interface Breed {
  weight: {
    imperial: string;
    metric: string;
  };
  height: {
    imperial: string;
    metric: string;
  };
  breed_group: string;
  life_span: string;
  name: string;
  temperament: string;
  id: string;
  cfa_url?: string;
  vetstreet_url?: string;
  vcahospitals_url?: string;
  origin?: string;
  country_codes?: string;
  country_code?: string;
  description?: string;
  indoor?: number;
  lap?: number;
  alt_names?: string;
  adaptability?: number;
  affection_level?: number;
  child_friendly?: number;
  dog_friendly?: number;
  energy_level?: number;
  grooming?: number;
  health_issues?: number;
  intelligence?: number;
  shedding_level?: number;
  social_needs?: number;
  stranger_friendly?: number;
  vocalisation?: number;
  experimental?: number;
  hairless?: number;
  natural?: number;
  rare?: number;
  rex?: number;
  suppressed_tail?: number;
  short_legs?: number;
  wikipedia_url?: string;
  hypoallergenic?: number;
  reference_image_id?: string;
}

export interface CatImage {
  id: string;
  url: string;
  breeds: Breed[];
}

export interface DetailedCat {
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
  breed_group: string;
  life_span: string;
  name: string;
  url: string;
  lifeSpan: string;
  temperament: string;
}
