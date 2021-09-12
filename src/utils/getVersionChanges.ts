import OPTIONS from "../options";
import { getCommits, GroupedCommits } from "./getCommits";
import { getTagDatePairs } from "./getTagDatePairs";
import { getUpcomingVersion } from "./getUpcomingVersion";

export interface VersionChanges {
  version: string;
  commits: GroupedCommits;
  date?: string;
}

export async function getVersionChanges(
  tags: string[]
): Promise<VersionChanges[]> {
  const upcomingRelease = getUpcomingVersion(tags);
  const addUpcomingSection =
    OPTIONS.hasUpcomingSection || upcomingRelease.isReady;
  const groupedCommits: VersionChanges[] = [];
  const tagDatePairs = getTagDatePairs();

  let previousTag: string | undefined = undefined;
  for (const tag of tags) {
    groupedCommits.push({
      version: tag,
      commits: await getCommits({ from: previousTag, to: tag }),
      date: tagDatePairs[tag],
    });
    previousTag = tag;
  }

  if (addUpcomingSection) {
    groupedCommits.push({
      version: upcomingRelease.version,
      date: new Date().toISOString().slice(0, 10),
      commits: await getCommits({ from: tags[tags.length - 1] }),
    });
  }
  return groupedCommits;
}
