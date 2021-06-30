import * as fs from "fs";
import OPTIONS from "./options";
import { getRepoTags, getVersionChanges, VersionChanges } from "./utils";

export async function createChangelog(): Promise<void> {
  const writeable = fs.createWriteStream("Changelog.md", { flags: "w" });
  const sortedRepoTags = (await getRepoTags()).reverse();
  const versions = (await getVersionChanges(sortedRepoTags)).reverse();
  versions.forEach((versionChanges: VersionChanges) => {
    writeable.write(`## ${versionChanges.version} \n`);
    Object.entries(versionChanges.commits).forEach(([type, commits]) => {
      if (OPTIONS.sortBy && commits.length > 0) {
        writeable.write(`### ${type} \n`);
      }
      commits.forEach((commit) => writeable.write(commit.message));
    });
  });
}
