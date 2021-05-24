import * as fs from "fs";
import gitRawCommits from "git-raw-commits";
import gitSemverTags from "git-semver-tags";

const writeable = fs.createWriteStream("Changelog.md", { flags: "a" });
gitRawCommits().pipe(writeable);
let repoTags = "";
gitSemverTags(function (error: Error, tags: string[]) {
  if (error) {
    console.error("An error occured while parsing for tags");
    console.error(error);
  }
  repoTags = tags.reduce(
    (result: string, currentTag) => result.concat(...["\n", currentTag]),
    ""
  );
});
writeable.write("The tags: \n");
writeable.write(repoTags);
writeable.write("The commit messages: \n");
