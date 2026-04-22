export type ResearchGroup = {
  id: string;
  name: string;
  website: string;
  tags: string[];
  description: string;
  headOfLab: string;
  university: string;
  country: string;
  city: string;
  source: string;
};

export type ResearchGroupStats = {
  totalGroups: number;
  totalCountries: number;
  totalUniversities: number;
  totalTopics: number;
};

export function normalizeValue(value: string) {
  return value.trim().toLowerCase();
}

export function buildResearchGroupStats(groups: ResearchGroup[]): ResearchGroupStats {
  const countries = new Set(groups.map((group) => group.country));
  const universities = new Set(groups.map((group) => group.university));
  const topics = new Set(groups.flatMap((group) => group.tags));

  return {
    totalGroups: groups.length,
    totalCountries: countries.size,
    totalUniversities: universities.size,
    totalTopics: topics.size,
  };
}
