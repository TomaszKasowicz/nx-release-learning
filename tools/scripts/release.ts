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

    console.log('--------------------------------');
try {
  const releaseVersionResult = await releaseVersion({
    specifier: options.version,
    dryRun: options.dryRun,
    verbose: options.verbose,
    firstRelease: options.firstRelease,
  });

  console.log('releaseVersionResult', JSON.stringify(releaseVersionResult, null, 2));

  const { workspaceVersion, projectsVersionData } = releaseVersionResult;

  const releaseChangelogResult = await releaseChangelog({
    versionData: projectsVersionData,
    version: workspaceVersion,
    dryRun: options.dryRun,
    verbose: options.verbose,
    firstRelease: options.firstRelease,
  });

  console.log('releaseChangelogResult', JSON.stringify(releaseChangelogResult, null, 2));

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

  console.log('publishResults', JSON.stringify(publishResults, null, 2));

  process.exit(
    Object.values(publishResults).every((result) => result.code === 0) ? 0 : 1
  );
} catch (error) {
  console.error('Error', error);
  process.exit(1);
}
})();
