"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { ResearchGroupCard } from "@/components/research-groups/research-group-card";
import {
  buildResearchGroupStats,
  normalizeValue,
  type ResearchGroup,
} from "@/lib/research-groups";

type ResearchGroupsDirectoryProps = {
  groups: ResearchGroup[];
};

export function ResearchGroupsDirectory({
  groups,
}: ResearchGroupsDirectoryProps) {
  const [search, setSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedUniversity, setSelectedUniversity] = useState("all");

  const stats = useMemo(() => buildResearchGroupStats(groups), [groups]);

  const topics = useMemo(
    () =>
      Array.from(new Set(groups.flatMap((group) => group.tags))).sort((a, b) =>
        a.localeCompare(b),
      ),
    [groups],
  );

  const countries = useMemo(
    () =>
      Array.from(new Set(groups.map((group) => group.country))).sort((a, b) =>
        a.localeCompare(b),
      ),
    [groups],
  );

  const universities = useMemo(() => {
    const base =
      selectedCountry === "all"
        ? groups
        : groups.filter(
            (group) =>
              normalizeValue(group.country) === normalizeValue(selectedCountry),
          );

    return Array.from(new Set(base.map((group) => group.university))).sort((a, b) =>
      a.localeCompare(b),
    );
  }, [groups, selectedCountry]);

  const filteredGroups = useMemo(() => {
    const query = normalizeValue(search);

    return groups.filter((group) => {
      const matchesSearch =
        query.length === 0 ||
        normalizeValue(group.name).includes(query) ||
        normalizeValue(group.description).includes(query) ||
        normalizeValue(group.headOfLab).includes(query) ||
        normalizeValue(group.university).includes(query) ||
        normalizeValue(group.city).includes(query) ||
        group.tags.some((tag) => normalizeValue(tag).includes(query));

      const matchesTopic =
        selectedTopic === "all" ||
        group.tags.some(
          (tag) => normalizeValue(tag) === normalizeValue(selectedTopic),
        );

      const matchesCountry =
        selectedCountry === "all" ||
        normalizeValue(group.country) === normalizeValue(selectedCountry);

      const matchesUniversity =
        selectedUniversity === "all" ||
        normalizeValue(group.university) === normalizeValue(selectedUniversity);

      return (
        matchesSearch &&
        matchesTopic &&
        matchesCountry &&
        matchesUniversity
      );
    });
  }, [groups, search, selectedTopic, selectedCountry, selectedUniversity]);

  const canReset =
    search.length > 0 ||
    selectedTopic !== "all" ||
    selectedCountry !== "all" ||
    selectedUniversity !== "all";

  const resetFilters = () => {
    setSearch("");
    setSelectedTopic("all");
    setSelectedCountry("all");
    setSelectedUniversity("all");
  };

  return (
    <section className="pb-24">
      <div className="border-b border-border bg-[linear-gradient(180deg,rgba(44,95,76,0.08),rgba(253,251,247,0.98))]">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 pb-16 pt-24 md:px-10 lg:px-12">
          <div className="max-w-4xl space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
              Research Groups
            </p>
            <h1 className="max-w-4xl text-4xl leading-tight text-foreground md:text-6xl">
              A searchable directory of chemistry research groups across the
              Global South
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
              Explore labs by topic, geography, and institution. This first
              release uses your curated spreadsheet as a structured directory so
              the site can grow toward automated discovery later.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Research groups" value={stats.totalGroups} />
            <StatCard label="Countries" value={stats.totalCountries} />
            <StatCard label="Universities" value={stats.totalUniversities} />
            <StatCard label="Topics" value={stats.totalTopics} />
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:px-10 lg:grid-cols-[320px_minmax(0,1fr)] lg:px-12">
        <aside className="h-fit rounded-3xl border border-border bg-card/70 p-6 shadow-sm lg:sticky lg:top-24">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </div>
            {canReset ? (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Reset
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="research-group-search"
                className="text-sm font-medium text-foreground"
              >
                Search
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="research-group-search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search topics, labs, universities..."
                  className="w-full rounded-2xl border border-input bg-background px-10 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                />
              </div>
            </div>

            <FilterSelect
              label="Topic"
              value={selectedTopic}
              onChange={(value) => {
                setSelectedTopic(value);
                setSelectedUniversity("all");
              }}
              options={topics}
              allLabel="All topics"
            />

            <FilterSelect
              label="Country"
              value={selectedCountry}
              onChange={(value) => {
                setSelectedCountry(value);
                setSelectedUniversity("all");
              }}
              options={countries}
              allLabel="All countries"
            />

            <FilterSelect
              label="University"
              value={selectedUniversity}
              onChange={setSelectedUniversity}
              options={universities}
              allLabel={
                selectedCountry === "all"
                  ? "All universities"
                  : `All universities in ${selectedCountry}`
              }
            />
          </div>
        </aside>

        <div className="space-y-6">
          <div className="flex flex-col gap-3 rounded-3xl border border-border bg-background/80 p-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Results
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">
                {filteredGroups.length} group{filteredGroups.length === 1 ? "" : "s"} found
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
              Start broad with topic or country, then narrow by institution. The
              search box also matches lab names, principal investigators, cities,
              and keywords in the descriptions.
            </p>
          </div>

          {filteredGroups.length > 0 ? (
            <div className="grid gap-5 xl:grid-cols-2">
              {filteredGroups.map((group) => (
                <ResearchGroupCard key={group.id} group={group} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-border bg-card/50 p-10 text-center">
              <p className="text-lg font-semibold text-foreground">
                No research groups match these filters.
              </p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Try clearing one or two filters, or search for a broader term
                like “spectroscopy”, “organic”, or a country name.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

type FilterSelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  allLabel: string;
};

function FilterSelect({
  label,
  value,
  onChange,
  options,
  allLabel,
}: FilterSelectProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
      >
        <option value="all">{allLabel}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

type StatCardProps = {
  label: string;
  value: number;
};

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-3xl border border-border bg-background/85 p-6 shadow-sm">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-4 text-4xl font-semibold text-foreground">{value}</p>
    </div>
  );
}
