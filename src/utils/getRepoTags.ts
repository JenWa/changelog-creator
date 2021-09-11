import gitSemverTags from "git-semver-tags";
import OPTIONS from "../options";

export function getRepoTags(): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => {
    gitSemverTags(
      { tagPrefix: OPTIONS.tagPrefix },
      (error: Error, tags: string[]) => {
        if (error) {
          reject(`An error occured while parsing for tags: ${error}`);
        }
        if (!tags) {
          resolve([]);
        }
        resolve(
          !OPTIONS.releasesOnly
            ? tags
            : tags.filter((tag) => !tag.includes(OPTIONS.preId))
        );
      }
    );
  });
}
