import * as fs from "fs";
import { getCommits, getRepoTags } from "./utils";

export const createChangelog = (): Promise<void> => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const writeable = fs.createWriteStream("Changelog.md", { flags: "a" });
      const commits = await getCommits();
      const repoTags = await getRepoTags();
      writeable.write("The tags: \n");
      repoTags.map((tag) => writeable.write(tag));
      writeable.write("The commit messages: \n");
      commits.map((commit) => writeable.write(commit));
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
