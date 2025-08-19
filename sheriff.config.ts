import { SheriffConfig } from '@softarc/sheriff-core';
import {readCachedProjectGraph } from '@nx/devkit'
import { globSync } from 'glob'
import path from 'path';

type SherrifModules = Required<SheriffConfig>['modules']

const LIB_TYPES = ['util', 'data-access', 'ui', 'feature', 'api', 'shell'];
const nodes = readCachedProjectGraph().nodes

const modules = Object.values(nodes).reduce<SherrifModules>(

  (acc, { data }) => {

  // const ctx = {
  //   tags: data.tags || [],
  //   sourceRoot: data.sourceRoot,
  //   root: data.root,
  //   name: data.name,
  // }

  // console.log('1111--------------------------------');
  // console.log(ctx);
  // console.log('--------------------------------');

  const tags = (data.tags || []).filter(tag => !tag.startsWith('npm:')).map(tag => tag.replace(' ', ''));

  // console.log('tags',tags);
  if (tags.length > 0) {
    acc[data.sourceRoot || data.root] = tags;
  }


  const internalFolder = path.join(data.root, 'internal');
  const scopeTag = data.tags?.find((tag) => tag.startsWith('scope:'))?.replace(' ', '');
  const scopes = scopeTag ? [scopeTag] : [];
  // find all "ng-package.json" files in the project/internal folder
  const ngPackageFiles = globSync('**/ng-package.json', { cwd: internalFolder });
  // console.log('ngPackageFiles',ngPackageFiles);
  for (const ngPackageFile of ngPackageFiles) {
    const ngPackageFolder = path.dirname(ngPackageFile);
    // console.log('ngPackageFolder',ngPackageFolder);
    const libType = LIB_TYPES.find((type) => ngPackageFolder.includes(type));
    // console.log('libType',libType);
    acc[path.join(data.root, 'internal', ngPackageFolder)] = ['type:' + libType, ...scopes]
  }
  // console.log('acc',acc);
  return acc;
}, {});


export const config: SheriffConfig = {
  enableBarrelLess: true,
  barrelFileName: 'not-applicable.ts',
  modules, // apply tags to your modules
  depRules: {
    'root': 'noTag',
    'noTag': 'noTag',
    // root is a virtual module, which contains all files not being part
    // of any module, e.g. application shell, main.ts, etc.
    'scope:journey': ['scope:shared', 'scope:journey'],
    'scope:shared': ['scope:shared'],
    'type:util': ['type:util'],
    'type:data-access': ['type:data-access', 'type:util'],
    'type:ui': ['type:ui', 'type:util'],
    'type:feature': ['type:feature', 'type:data-access', 'type:ui', 'type:util'],
    'type:shell': ['type:shell', 'type:feature', 'type:data-access', 'type:ui', 'type:util'],
    // add your dependency rules here
  },
};

// console.log(config);
// console.log('========================================');
