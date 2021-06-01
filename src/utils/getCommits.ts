import gitRawCommits from "git-raw-commits";

export const getCommits = (): Promise<string[]> => {
  return new Promise<string[]>((resolve, reject) => {
    const commits = [];
    gitRawCommits()
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
