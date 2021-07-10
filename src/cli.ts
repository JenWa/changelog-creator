import { createChangelog } from "./createChangelog";

export const cli = (): Promise<void> =>
  createChangelog()
    .then(() => console.info("Created Changelog.md"))
    .catch((error) => console.error(error));
