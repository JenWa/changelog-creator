import fs from "fs";

export const getUpcomingVersion = (tags: string[]): string => {
  const packageJson = fs.readFileSync("package.json").toString();
  const version = JSON.parse(packageJson).version || "0";
  if (version === "0")
    console.warn("Can not read version from your package.json");
  return tags.includes(version) || version === "0.0.0"
    ? "Upcoming release (not yet planned)"
    : version;
};
