import { createChangelog } from "./createChangelog";
import OPTIONS from "./options";

export const cli = (): Promise<void> =>
  createChangelog()
    .then(() => console.info(`Created ${OPTIONS.fileName}`))
    .catch((error) => console.error(error));
