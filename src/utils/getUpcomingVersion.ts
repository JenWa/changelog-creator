import fs from "fs";
import OPTIONS from "../options";

export const getUpcomingVersion = (tags: string[]): string => {
  const packageJson = fs.readFileSync("package.json").toString();
  const version = JSON.parse(packageJson).version || "0";
  console.log(OPTIONS.tagPrefix + version);
  if (version === "0")
    console.warn("Can not read version from your package.json");
  return tags.includes(OPTIONS.tagPrefix + version) || version === "0.0.0"
    ? "Upcoming release (not yet planned)"
    : version;
};
