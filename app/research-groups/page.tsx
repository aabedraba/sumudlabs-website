import { Footer } from "@/components/footer";
import { ResearchGroupsDirectory } from "@/components/research-groups/research-groups-directory";
import type { ResearchGroup } from "@/lib/research-groups";
import { promises as fs } from "node:fs";
import path from "node:path";

export const metadata = {
  title: "Research Groups | Sumud Labs",
  description:
    "Explore chemistry research groups across the Global South by topic, country, and institution.",
};

async function getResearchGroups(): Promise<ResearchGroup[]> {
  const filePath = path.join(process.cwd(), "lib", "data", "research-groups.json");
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as ResearchGroup[];
}

export default async function ResearchGroupsPage() {
  const groups = await getResearchGroups();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <ResearchGroupsDirectory groups={groups} />
      <Footer />
    </main>
  );
}
