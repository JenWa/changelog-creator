import gitRawCommits from "git-raw-commits";

interface GitOptions {
  /** Defines the earliest tag version the commit messages are retrieved. */
  from?: string;
  /** Defines untill which tag version the commit messages are retrieved. */
  to?: string;
}

const isMergeCommit = (commit: string): boolean => commit.startsWith("Merge");

export const getCommits = (commitsRange?: GitOptions): Promise<string[]> => {
  return new Promise<string[]>((resolve, reject) => {
    const commits = [];
    // for format see section "Placeholders that expand to information extracted from the commit"
    // http://git-scm.com/docs/git-log
    gitRawCommits({ ...commitsRange, format: "%s  \n%b\n" })
      .on("data", (line) => {
        if (!isMergeCommit(line.toString())) {
          commits.push("* " + line.toString());
        }
      })
      .on("error", (error) => {
        reject(error);
      })
      .on("end", () => {
        resolve(commits);
      });
  });
};
