function readPackage(pkg) {
  // Automatically approve all build scripts
  if (pkg.scripts) {
    // Allow all lifecycle scripts to run
    pkg.allowBuild = true;
  }
  return pkg;
}

module.exports = {
  hooks: {
    readPackage
  }
};

