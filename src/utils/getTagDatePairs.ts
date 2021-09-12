import { execSync } from "child_process";

export interface TagDatePairs {
  [tag: string]: string;
}

export function getTagDatePairs(): TagDatePairs {
  const tagDatePairs: TagDatePairs = {};
  const cmdGitTagOutput = execSync(
    `git log --tags --simplify-by-decoration --pretty="format:%ai %d"`,
    { encoding: "utf8" }
  ).toString();
  for (const tagDateLine of cmdGitTagOutput.split(/[\r\n]+/)) {
    // Check is necessary since sometimes the branch name is displayed
    if (tagDateLine.includes("tag:")) {
      const parsedDate = tagDateLine.match(/^([^\s]+)/);
      const parsedTag = tagDateLine
        .split("(tag: ")[1]
        ?.replace(/\)([^\)]*)$/, ""); // Remove last occurence of ")"
      if (parsedTag && parsedDate && parsedDate[0]) {
        tagDatePairs[parsedTag] = parsedDate[0];
      }
    }
  }
  return tagDatePairs;
}
