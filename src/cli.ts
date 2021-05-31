import { createChangelog } from "./createChangelog";

export const cli = (): void => {
  createChangelog()
    .then(() => console.info("Created Changelog.md"))
    .catch((error) => console.error(error));
};
