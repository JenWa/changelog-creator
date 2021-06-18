import OPTIONS from "../options";
import { getCommits, GroupedCommits } from "./getCommits";
import { getUpcomingVersion } from "./getUpcomingVersion";

export interface VersionChanges {
  version: string;
  commits: GroupedCommits;
}

export const getVersionChanges = (
  tags: string[]
): Promise<VersionChanges[]> => {
  return new Promise<VersionChanges[]>(async (resolve, reject) => {
    try {
      const upcomingRelease = getUpcomingVersion(tags);
      const addUpcomingSection =
        OPTIONS.hasUpcomingSection || upcomingRelease.isReady;

      if (tags.length < 1) {
        resolve(
          addUpcomingSection
            ? [
                {
                  version: upcomingRelease.version,
                  commits: await getCommits(),
                },
              ]
            : []
        );
      }
      const groupedCommits: VersionChanges[] = [
        {
          version: tags[0],
          commits: await getCommits({ to: tags[0] }),
        },
      ];
      tags.forEach(async (tag, i) => {
        if (0 < i && i < tags.length) {
          groupedCommits.push({
            version: tag,
            commits: await getCommits({ from: tags[i - 1], to: tag }),
          });
        }
      });
      addUpcomingSection &&
        groupedCommits.push({
          version: upcomingRelease.version,
          commits: await getCommits({ from: tags[tags.length - 1] }),
        });
      resolve(groupedCommits);
    } catch (error) {
      reject(error);
    }
  });
};
