import * as fs from "fs";
import gitRawCommits from "git-raw-commits";
import gitSemverTags from "git-semver-tags";

export const createChangelog = (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const writeable = fs.createWriteStream("Changelog.md", { flags: "a" });
    gitRawCommits().pipe(writeable);
    let repoTags = "";
    gitSemverTags(function (error: Error, tags: string[]) {
      if (error) {
        reject(`An error occured while parsing for tags: ${error}`);
      }
      repoTags = tags.reduce(
        (result: string, currentTag) => result.concat(...["\n", currentTag]),
        ""
      );
    });
    writeable.write("The tags: \n");
    writeable.write(repoTags);
    writeable.write("The commit messages: \n");
    resolve();
  });
};
