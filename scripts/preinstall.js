/**
 * Do not allow the use of `npm` as this project's package manager
 */
if (process.env.npm_execpath.indexOf('yarn') === -1) {
  console.error('You must use Yarn to install dependencies:'); // eslint-disable-line no-console
  console.error('  $ yarn install', ''); // eslint-disable-line no-console
  process.exit(1);
}
