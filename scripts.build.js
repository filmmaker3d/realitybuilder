({
    appDir: 'scripts',
    baseUrl: '.',
    dir: 'scripts.build',
    removeCombined: true,
    optimize: 'uglify',
    paths: {
        'requireLib': 'vendor/require'
    },
    wrap: {
        startFile: 'scripts.build.start.js',
        endFile: 'scripts.build.end.js'
    },
    modules: [{
        name: 'main',
        include: 'requireLib'
    }]
})
