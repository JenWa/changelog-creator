type Options = {
  fileName: string;
  hasUpcomingSection: boolean;
  releasesOnly: boolean;
  sortBy?: "type";
  tagPrefix: string;
};

/**
 * The configuration of this module, e.g. to define which prefix your tags have.
 * The configuration has either default values or some are overwritten by you via the CLI.
 */
const OPTIONS: Options = {
  fileName: "Changelog.md",
  hasUpcomingSection: false,
  releasesOnly: false,
  tagPrefix: "v",
};
export default OPTIONS;
