import gitRawCommits from "git-raw-commits";

interface GitOptions {
  /** Defines the earliest tag version the commit messages are retrieved. */
  from?: string;
  /** Defines untill which tag version the commit messages are retrieved. */
  to?: string;
}

export const getCommits = (commitsRange?: GitOptions): Promise<string[]> => {
  return new Promise<string[]>((resolve, reject) => {
    const commits = [];
    gitRawCommits(commitsRange)
      .on("data", (line) => {
        commits.push(line.toString());
      })
      .on("error", (error) => {
        reject(error);
      })
      .on("end", () => {
        resolve(commits);
      });
  });
};
