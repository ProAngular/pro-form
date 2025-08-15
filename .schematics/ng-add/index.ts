import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  addPackageJsonDependency,
  NodeDependencyType,
  getPackageJsonDependency,
} from '@schematics/angular/utility/dependencies';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

interface Schema {
  skipInstall?: boolean;
  withAdapter?: boolean;
  withLuxon?: boolean;
}

function resolveMaterialAdapterVersion(tree: Tree): string {
  const dep = getPackageJsonDependency(tree, '@angular/material', 'package.json');
  if (dep?.version) {
    const m = dep.version.match(/^[~^]?(\d+)\./);
    if (m) return `^${m[1]}.0.0`;
  }
  return '^20.0.0';
}

function ensureDep(tree: Tree, name: string, version: string): void {
  addPackageJsonDependency(tree, {
    type: NodeDependencyType.Default,
    name,
    version,
    overwrite: false,
  });
}

export function ngAdd(options: Schema = {}): Rule {
  return (tree: Tree, context: SchematicContext) => {
    ensureDep(tree, 'tslib', '^2.8.1');

    if (options.withLuxon !== false) {
      ensureDep(tree, 'luxon', '^3.5.0');
    }

    if (options.withAdapter !== false) {
      const adapterVersion = resolveMaterialAdapterVersion(tree);
      ensureDep(tree, '@angular/material-luxon-adapter', adapterVersion);
    }

    if (!options.skipInstall) {
      context.logger.info('Installing packages...');
      context.addTask(new NodePackageInstallTask());
    } else {
      context.logger.info('Skipping package installation as requested.');
    }

    return tree;
  };
}
