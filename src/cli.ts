import { createChangelog } from "./createChangelog";

export function cli(): void {
  createChangelog()
    .then(() => console.info("Created Changelog.md"))
    .catch((error) => console.error(error));
}
