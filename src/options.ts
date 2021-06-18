type Options = {
  tagPrefix: string;
  releasesOnly: boolean;
  hasUpcomingSection: boolean;
  sortBy?: "type";
};

/**
 * The configuration of this module, e.g. to define which prefix your tags have.
 * The configuration has either default values or some are overwritten by you via the CLI.
 */
const OPTIONS: Options = {
  tagPrefix: "v",
  releasesOnly: false,
  hasUpcomingSection: false,
};
export default OPTIONS;
