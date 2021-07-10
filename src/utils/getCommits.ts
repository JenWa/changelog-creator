import "core-js/features/string/virtual";
import gitRawCommits from "git-raw-commits";
import OPTIONS from "../options";

interface GitOptions {
  /** The tag that has been created before the tag specified through the `to` prop. */
  from?: string;
  /** The tag that has been created after the tag specified through the `from` prop. */
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

/** Since the commit messages are written in a markdown file, html tags have to be "neutralized" */
const sanitizeCommitMessage = (commitMessage: string): string =>
  commitMessage.replaceAll(/<\s*\/?\s*[^>]*>/g, `\`$&\``) as string;

const isMergeCommit = (commit: string): boolean => commit.startsWith("Merge");

/**
 * Returns all the commits lying in the defined range of the versions.
 * E.g. if you have 3 tags v1.0.0, v2.0.0 and v.3.0.0 you could either receive all commits
 * by passing { to: v3.0.0 } or if you like to receive the commits from version v2.0.0 you have
 * to pass { from: v1.0.0, to: v2.0.0 }.
 */
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
        const commitMessage = sanitizeCommitMessage(line.toString());
        if (isMergeCommit(commitMessage)) {
          return;
        }

        const commitType =
          conventionalTypes.find(
            (type) => OPTIONS.sortBy && commitMessage.startsWith(type)
          ) ?? UNKNOWN_TYPE;

        commits[commitType].push({
          message: `*  ${commitMessage}`,
        });
      })
      .on("error", (error) => {
        reject(`An error occured while parsing for commits:\n${error}`);
      })
      .on("end", () => {
        resolve(commits);
      });
  });
}
