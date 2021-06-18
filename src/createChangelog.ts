import * as fs from "fs";
import OPTIONS from "./options";
import {
  Commit,
  getRepoTags,
  getVersionChanges,
  VersionChanges,
} from "./utils";

export const createChangelog = (): Promise<void> => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const writeable = fs.createWriteStream("Changelog.md", { flags: "w" });
      const sortedRepoTags = (await getRepoTags()).reverse();
      const versions = (await getVersionChanges(sortedRepoTags)).reverse();
      versions.forEach((versionChanges: VersionChanges) => {
        writeable.write(`## ${versionChanges.version} \n`);
        for (const type in versionChanges.commits) {
          const groupedCommits = versionChanges.commits[type];
          if (OPTIONS.sortBy && groupedCommits.length > 0)
            writeable.write(`### ${type} \n`);
          groupedCommits.forEach((commit: Commit) =>
            writeable.write(commit.message)
          );
        }
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
