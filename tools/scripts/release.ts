import { releaseChangelog, releasePublish, releaseVersion } from 'nx/release';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

(async () => {
  const options = await yargs(hideBin(process.argv))
    .version(false)
    .option('version', {
      description:
        'Explicit version specifier to use, if overriding conventional commits',
      type: 'string',
    })
    .option('dryRun', {
      alias: 'd',
      description:
        'Whether or not to perform a dry-run of the release process, defaults to true',
      type: 'boolean',
      default: true,
    })
    .option('verbose', {
      description:
        'Whether or not to enable verbose logging, defaults to false',
      type: 'boolean',
      default: false,
    })
    .option('firstRelease', {
      description:
        'Whether or not to perform a first release, defaults to false',
      type: 'boolean',
      default: false,
    })
    .parseAsync();

  const { workspaceVersion, projectsVersionData } = await releaseVersion({
    specifier: options.version,
    dryRun: options.dryRun,
    verbose: options.verbose,
    firstRelease: options.firstRelease,
  });

  await releaseChangelog({
    versionData: projectsVersionData,
    version: workspaceVersion,
    dryRun: options.dryRun,
    verbose: options.verbose,
    firstRelease: options.firstRelease,
  });

  // publishResults contains a map of project names and their exit codes
  const publishResults = await releasePublish({
    dryRun: options.dryRun,
    verbose: options.verbose,
    // You can optionally pass through the version data (e.g. if you are using a custom publish executor that needs to be aware of versions)
    // It will then be provided to the publish executor options as `nxReleaseVersionData`
    // This is not required for the default @nx/js publish executor
    versionData: projectsVersionData,
    firstRelease: options.firstRelease,
  });

  process.exit(
    Object.values(publishResults).every((result) => result.code === 0) ? 0 : 1
  );
})();
