import arg from "arg";
import OPTIONS from "../options";

export const passCLIArgumentsToOptions = (): void => {
  console.info(`The options from cli: ${process.argv.slice(2)}`);
  const args = arg(
    {
      "--tag-prefix": String,
      "-t": "--tag-prefix",
      "--releases-only": Boolean,
      "-r": "--releases-only",
    },
    { permissive: true, argv: process.argv.slice(2) }
  );
  OPTIONS.tagPrefix = args["--tag-prefix"] ?? OPTIONS.tagPrefix;
  OPTIONS.releasesOnly = args["--releases-only"] ?? OPTIONS.releasesOnly;
  if (args._.length > 0) {
    console.warn(
      `Following arguments aren't recognized. Ignoring them: \n${args._}`
    );
  }
};
