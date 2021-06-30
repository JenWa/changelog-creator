import OPTIONS from "../options";
import { getCommits, GroupedCommits } from "./getCommits";
import { getUpcomingVersion } from "./getUpcomingVersion";

export interface VersionChanges {
  version: string;
  commits: GroupedCommits;
}

export async function getVersionChanges(
  tags: string[]
): Promise<VersionChanges[]> {
  const upcomingRelease = getUpcomingVersion(tags);
  const addUpcomingSection =
    OPTIONS.hasUpcomingSection || upcomingRelease.isReady;
  const groupedCommits: VersionChanges[] = [];

  let previousTag: string | undefined = undefined;
  for (const tag of tags) {
    groupedCommits.push({
      version: tag,
      commits: await getCommits({ from: previousTag, to: tag }),
    });
    previousTag = tag;
  }

  if (addUpcomingSection) {
    groupedCommits.push({
      version: upcomingRelease.version,
      commits: await getCommits({ from: tags[tags.length - 1] }),
    });
  }
  return groupedCommits;
}
