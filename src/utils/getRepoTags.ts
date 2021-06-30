import gitSemverTags from "git-semver-tags";
import OPTIONS from "../options";

export function getRepoTags(): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => {
    gitSemverTags((error: Error, tags: string[]) => {
      if (error) {
        reject(`An error occured while parsing for tags: ${error}`);
      }
      resolve(
        !OPTIONS.releasesOnly ? tags : tags.filter((tag) => !tag.includes("-"))
      );
    });
  });
}
