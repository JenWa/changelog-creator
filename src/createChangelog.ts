import * as fs from "fs";
import { getRepoTags, getVersionChanges, VersionChanges } from "./utils";

export const createChangelog = (): Promise<void> => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const writeable = fs.createWriteStream("Changelog.md", { flags: "w" });
      const sortedRepoTags = (await getRepoTags()).reverse();
      const groupedCommits = (
        await getVersionChanges(sortedRepoTags)
      ).reverse();
      groupedCommits.forEach((changes: VersionChanges) => {
        writeable.write(`## ${changes.version} \n`);
        changes.commits.forEach((commit) => {
          writeable.write(commit);
        });
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
