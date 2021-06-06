import fs from "fs";
import OPTIONS from "../options";

const isUpcomingReleaseDefined = (tags: string[], packageVersion: string) =>
  tags.includes(OPTIONS.tagPrefix + packageVersion) ||
  packageVersion === "0.0.0" ||
  (packageVersion.includes("-") && !OPTIONS.releasesOnly);

export const getUpcomingVersion = (tags: string[]): string => {
  const packageJson = fs.readFileSync("package.json").toString();
  const version = JSON.parse(packageJson).version || "0";
  console.log(OPTIONS.tagPrefix + version);
  if (version === "0")
    console.warn("Can not read version from your package.json");
  return isUpcomingReleaseDefined(tags, version)
    ? "Upcoming release (not yet planned)"
    : version;
};
