import "core-js/features/string/virtual";
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
  [Key in ConventionalType | "others"]: Commit[];
};

enum ConventionalType {
  build = "build",
  chore = "chore",
  ci = "ci",
  docs = "docs",
  feat = "feat",
  fix = "fix",
  perf = "perf",
  refactor = "refactor",
  revert = "revert",
  style = "style",
  test = "test",
}

const defuseHTML = (commitMessage: string): string =>
  commitMessage.replaceAll(/<\s*\/?\s*[^>]*>/g, `\`$&\``) as string;

const isMergeCommit = (commit: string): boolean => commit.startsWith("Merge");

export function getCommits(commitsRange?: GitOptions): Promise<GroupedCommits> {
  return new Promise<GroupedCommits>((resolve, reject) => {
    const conventionalTypes = Object.values(ConventionalType);
    const commits: GroupedCommits = <GroupedCommits>(
      conventionalTypes.reduce(
        (accu, current) => ({ ...accu, [current]: [] }),
        { [UNKNOWN_TYPE]: [] as Commit[] }
      )
    );

    // for format see section "Placeholders that expand to information extracted from the commit"
    // http://git-scm.com/docs/git-log
    gitRawCommits({ ...commitsRange, format: "%s  \n%b\n" })
      .on("data", (line) => {
        const commitMessage = defuseHTML(line.toString());
        if (isMergeCommit(commitMessage)) {
          return;
        }

        const commitType =
          conventionalTypes.find(
            (type) => OPTIONS.sortBy && commitMessage.startsWith(type)
          ) ?? UNKNOWN_TYPE;

        commits[commitType].push({
          message: "*  " + commitMessage,
        });
      })
      .on("error", (error) => {
        reject(error);
      })
      .on("end", () => {
        resolve(commits);
      });
  });
}
