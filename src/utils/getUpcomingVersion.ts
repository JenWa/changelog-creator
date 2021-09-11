import { readFileSync } from "fs";
import OPTIONS from "../options";

export interface UpcomingRelease {
  isReady: boolean;
  version: string;
}

const isVersionAlreadyAssigned = (
  tags: string[],
  packageVersion: string | undefined
) =>
  !packageVersion ||
  tags.includes(packageVersion) ||
  packageVersion === `${OPTIONS.tagPrefix}0.0.0` ||
  (packageVersion.includes(OPTIONS.preId) && !OPTIONS.releasesOnly);

export function getUpcomingVersion(tags: string[]): UpcomingRelease {
  const packageJson = readFileSync("package.json").toString();
  const version = `${OPTIONS.tagPrefix}${JSON.parse(packageJson).version}`;
  if (!version) console.warn("Can not read version from your package.json");
  return isVersionAlreadyAssigned(tags, version)
    ? { isReady: false, version: "Upcoming release (not yet planned)" }
    : { isReady: true, version };
}
