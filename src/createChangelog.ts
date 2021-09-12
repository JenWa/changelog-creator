import { createWriteStream } from "fs";
import OPTIONS from "./options";
import { getRepoTags, getVersionChanges, VersionChanges } from "./utils";

function getVersionHeadline(version: string, date?: string) {
  const versionDateText = date ? `(${date})` : "";
  return `## ${version} ${versionDateText} \n`;
}

export async function createChangelog(): Promise<void> {
  const writeable = createWriteStream(OPTIONS.fileName, { flags: "w" });
  const sortedRepoTags = (await getRepoTags()).reverse();
  const versions = (await getVersionChanges(sortedRepoTags)).reverse();
  versions.forEach((versionChanges: VersionChanges) => {
    writeable.write(
      getVersionHeadline(versionChanges.version, versionChanges.date)
    );
    Object.entries(versionChanges.commits).forEach(([type, commits]) => {
      if (OPTIONS.sortBy && commits.length > 0) {
        writeable.write(`### ${type} \n`);
      }
      commits.forEach((commit) => writeable.write(commit.message));
    });
  });
}
