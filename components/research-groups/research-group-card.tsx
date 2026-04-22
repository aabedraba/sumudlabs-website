import type { ResearchGroup } from "@/lib/research-groups";
import { ExternalLink, Globe, MapPin, UserRound } from "lucide-react";

type ResearchGroupCardProps = {
  group: ResearchGroup;
};

export function ResearchGroupCard({ group }: ResearchGroupCardProps) {
  return (
    <article className="flex h-full flex-col rounded-3xl border border-border bg-card/80 p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            {group.country}
          </p>
          <h3 className="max-w-2xl text-2xl font-semibold text-foreground">
            {group.name}
          </h3>
        </div>

        <a
          href={group.website}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Visit lab
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
        <div className="inline-flex items-start gap-2">
          <UserRound className="mt-0.5 h-4 w-4 text-primary" />
          <div>
            <p className="font-medium text-foreground">Head of Lab</p>
            <p>{group.headOfLab}</p>
          </div>
        </div>

        <div className="inline-flex items-start gap-2">
          <Globe className="mt-0.5 h-4 w-4 text-primary" />
          <div>
            <p className="font-medium text-foreground">University</p>
            <p>{group.university}</p>
          </div>
        </div>

        <div className="inline-flex items-start gap-2 sm:col-span-2">
          <MapPin className="mt-0.5 h-4 w-4 text-primary" />
          <div>
            <p className="font-medium text-foreground">Location</p>
            <p>
              {group.city}, {group.country}
            </p>
          </div>
        </div>
      </div>

      <p className="mt-5 flex-1 text-sm leading-7 text-muted-foreground">
        {group.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {group.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-primary/15 bg-background px-3 py-1 text-xs font-medium text-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 border-t border-border pt-4 text-xs text-muted-foreground">
        Source:{" "}
        <a
          href={group.source}
          target="_blank"
          rel="noreferrer"
          className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
        >
          {group.source}
        </a>
      </div>
    </article>
  );
}
