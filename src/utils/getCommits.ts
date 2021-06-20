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

const UNKNOWN_TYPE = "others";

export type GroupedCommits = {
  [Key in AngularType]?: Commit[];
} &
  { [Key in "others"]?: Commit[] };

enum AngularType {
  feat = "feat",
  fix = "fix",
  chore = "chore",
  docs = "docs",
  style = "style",
  refactor = "refactor",
  perf = "perf",
  test = "test",
}

const isMergeCommit = (commit: string): boolean => commit.startsWith("Merge");

export const getCommits = (
  commitsRange?: GitOptions
): Promise<GroupedCommits> => {
  return new Promise<GroupedCommits>((resolve, reject) => {
    const commits: GroupedCommits = { [UNKNOWN_TYPE]: [] };
    for (const type in AngularType) {
      commits[type] = [];
    }
    const angularTypes = Object.keys(AngularType).map(
      (type) => AngularType[type]
    );
    // for format see section "Placeholders that expand to information extracted from the commit"
    // http://git-scm.com/docs/git-log
    gitRawCommits({ ...commitsRange, format: "%s  \n%b\n" })
      .on("data", (line) => {
        const commitMessage = line.toString();
        let commitType = UNKNOWN_TYPE;
        if (!isMergeCommit(commitMessage)) {
          if (OPTIONS.sortBy) {
            commitType = angularTypes.find((type) => {
              const regex = new RegExp(`^${type}`);
              if (regex.test(commitMessage)) return type;
            });
          }
          commits[commitType || UNKNOWN_TYPE].push({
            message: "*  " + commitMessage,
          });
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
