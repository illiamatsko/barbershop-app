import { CreateNodesV2 } from '@nx/devkit';

export const createNodesV2: CreateNodesV2 = [
  'libs/**/index.ts',
  (indexPathList) => {
    return indexPathList.map((indexPath) => {
      const pathParts = indexPath.split('/');
      const projectRoot = pathParts.slice(0, -1).join('/');
      const projectName = pathParts.slice(1, -1).join('-');
      const type = pathParts.at(-2) ?? 'unknown';
      const platform = pathParts.at(1) ?? 'unknown';
      const scope = pathParts.at(2) ?? 'unknown';

      return [
        indexPath,
        {
          projects: {
            [projectRoot]: {
              name: projectName,
              sourceRoot: projectRoot,
              projectType: 'library',
              tags: [`platform:${platform}`, `scope:${scope}`, `type:${type}`],
              targets: {
                lint: {
                  executor: '@nx/eslint:lint',
                  options: {
                    lintFilePatterns: [`${projectRoot}/**/*.ts`]
                  }
                },
                test: {
                  executor: '@nx/vite:test',
                  options: {
                    config: `${projectRoot}/vitest.config.ts`
                  }
                }
              }
            },
          },
        },
      ];
    });
  },
];
