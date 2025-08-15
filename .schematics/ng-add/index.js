"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ngAdd = ngAdd;
const dependencies_1 = require("@schematics/angular/utility/dependencies");
const tasks_1 = require("@angular-devkit/schematics/tasks");
function ensureDep(tree, name, version) {
    (0, dependencies_1.addPackageJsonDependency)(tree, {
        type: dependencies_1.NodeDependencyType.Default,
        name,
        version,
        overwrite: false,
    });
}
function ngAdd(options = {}) {
    return (tree, context) => {
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
            context.addTask(new tasks_1.NodePackageInstallTask());
        }
        else {
            context.logger.info('Skipping package installation as requested.');
        }
        return tree;
    };
}
function resolveMaterialAdapterVersion(tree) {
    const dep = (0, dependencies_1.getPackageJsonDependency)(tree, '@angular/material', 'package.json');
    if (dep === null || dep === void 0 ? void 0 : dep.version) {
        const m = dep.version.match(/^[~^]?(\d+)\./);
        if (m)
            return `^${m[1]}.0.0`;
    }
    return '^20.0.0';
}
