import fs from "fs";
import OPTIONS from "../options";

const isUpcomingReleaseDefined = (tags: string[], packageVersion: string) =>
  tags.includes(`${OPTIONS.tagPrefix}${packageVersion}`) ||
  packageVersion === "0.0.0" ||
  (packageVersion.includes("-") && !OPTIONS.releasesOnly);

export function getUpcomingVersion(tags: string[]): UpcomingRelease {
  const packageJson = fs.readFileSync("package.json").toString();
  const version = JSON.parse(packageJson).version || "0";
  if (version === "0")
    console.warn("Can not read version from your package.json");
  return isUpcomingReleaseDefined(tags, version)
    ? { isReady: false, version: "Upcoming release (not yet planned)" }
    : { isReady: true, version };
}

export type UpcomingRelease = {
  isReady: boolean;
  version: string;
};
