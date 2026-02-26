const [major, minor] = process.versions.node.split('.');

if (major < 20 || (major === 20 && minor < 9)) {
    console.error('Error: Node 20.9.0 or higher is required');
    process.exit(1);
}