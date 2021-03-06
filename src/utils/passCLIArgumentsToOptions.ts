import arg from "arg";
import OPTIONS from "../options";

export interface CLIArguments {
  hasHelpFlag: boolean;
}

// TODO: Maybe replace at some point with yargs??
export function passCLIArgumentsToOptions(): CLIArguments {
  const args = arg(
    {
      "--file-name": String,
      "-f": "--file-name",
      "--tag-prefix": String,
      "-t": "--tag-prefix",
      "--releases-only": Boolean,
      "-r": "--releases-only",
      "--has-upcoming-section": Boolean,
      "-u": "--has-upcoming-section",
      "--sort-by": String,
      "-s": "--sort-by",
      "--help": Boolean,
      "-h": "--help",
      "--pre-id": String,
      "-p": "--pre-id",
      "--hide-date": Boolean,
    },
    { permissive: true, argv: process.argv.slice(2) }
  );
  const hasHelpFlag = args["--help"] ?? false;
  if (hasHelpFlag) {
    console.log(`
    Please note that you asked for help. A Changelog will not be created.

    This is a list of arguments you may pass to this package:

    "--file-name", "-f":           Define the file name of the changelog. Default: "Changelog.md"
    "--tag-prefix", "-t":          Define which prefix you use for your tags. Default: "v", e.g. "v.1.0.1".
    "--pre-id", "-p":              Define which prerelease-id you use. Default: "alpha", e.g. "v.1.1.0-alpha.1".
    "--releases-only","-r":        If the Changelog should be only grouped in releases and not also in pre-releases. Default: Pre-releases appear in Changelog. 
    "--has-upcoming-section","-u": If the Changelog should have a section with the latest commits which don't belong to a version yet. Default: false.
    "--sort-by","-s":              If the commits should be grouped. Options: "type" | undefined. Default: undefined.
    "--help", "-h":                Display help for this package.
    "--hide-date":                 Don't display the release date next to the version.
    
    For further information have a look at https://github.com/JenWa/changelog-creator#readme.
    `);
  } else {
    OPTIONS.fileName = args["--file-name"] ?? OPTIONS.fileName;
    OPTIONS.tagPrefix = args["--tag-prefix"] ?? OPTIONS.tagPrefix;
    OPTIONS.releasesOnly = args["--releases-only"] ?? OPTIONS.releasesOnly;
    OPTIONS.hasUpcomingSection =
      args["--has-upcoming-section"] ?? OPTIONS.hasUpcomingSection;
    OPTIONS.sortBy = args["--sort-by"] === "type" ? "type" : OPTIONS.sortBy;
    OPTIONS.preId = args["--pre-id"] ?? OPTIONS.preId;
    OPTIONS.hideDate = !!args["--hide-date"];
    if (args._.length > 0) {
      console.warn(
        `Following arguments aren't recognized. Ignoring them: \n${args._}`
      );
    }
  }
  return { hasHelpFlag };
}
