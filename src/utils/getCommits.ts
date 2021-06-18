import gitRawCommits from "git-raw-commits";
import OPTIONS from "../options";

interface GitOptions {
  /** Defines the earliest tag version the commit messages are retrieved. */
  from?: string;
  /** Defines untill which tag version the commit messages are retrieved. */
  to?: string;
}

export interface Commit {
  message: string;
}

export type GroupedCommits = {
  [Key in CommitType]?: Commit[];
};

enum CommitType {
  feat = "feat",
  fix = "fix",
  chore = "chore",
  docs = "docs",
  style = "style",
  refactor = "refactor",
  perf = "perf",
  test = "test",
  others = "others",
}

const isMergeCommit = (commit: string): boolean => commit.startsWith("Merge");

export const getCommits = (
  commitsRange?: GitOptions
): Promise<GroupedCommits> => {
  return new Promise<GroupedCommits>((resolve, reject) => {
    const commits: GroupedCommits = {};
    for (const type in CommitType) {
      commits[type] = [];
    }
    // for format see section "Placeholders that expand to information extracted from the commit"
    // http://git-scm.com/docs/git-log
    gitRawCommits({ ...commitsRange, format: "%s  \n%b\n" })
      .on("data", (line) => {
        const commitMessage = line.toString();
        if (!isMergeCommit(commitMessage)) {
          if (OPTIONS.sortBy) {
            for (const type in CommitType) {
              const regex = new RegExp(`^${type}`);
              if (regex.test(commitMessage))
                commits[type].push({ message: "*  " + commitMessage });
            }
          } else {
            commits[CommitType.others].push({
              message: "*  " + commitMessage,
            });
          }
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
