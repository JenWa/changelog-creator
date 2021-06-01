import gitSemverTags from "git-semver-tags";

export const getRepoTags = (): Promise<string[]> => {
  return new Promise<string[]>((resolve, reject) => {
    gitSemverTags(function (error: Error, tags: string[]) {
      if (error) {
        reject(`An error occured while parsing for tags: ${error}`);
      }
      resolve(tags);
    });
  });
};
