import { getCommits } from "./getCommits";

export interface VersionChanges {
  version: string;
  commits: string[];
}

export const getVersionChanges = (
  tags: string[]
): Promise<VersionChanges[]> => {
  return new Promise<VersionChanges[]>(async (resolve, reject) => {
    try {
      if (tags.length < 1) {
        // Todo: retreive version from package json
        resolve([{ version: "No version yet", commits: await getCommits() }]);
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
      // Todo: Check for version in package.json and only add this line if the last tag version is smaller than the package version
      groupedCommits.push({
        version: "Head",
        commits: await getCommits({ from: tags[tags.length - 1] }),
      });
      resolve(groupedCommits);
    } catch (error) {
      reject(error);
    }
  });
};
