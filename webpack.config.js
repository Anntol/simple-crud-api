export default {
    target: 'node',
    entry: './src/server.js',
    output: {
        clean: true,
        filename: 'server.bundle.cjs',
    }
};
