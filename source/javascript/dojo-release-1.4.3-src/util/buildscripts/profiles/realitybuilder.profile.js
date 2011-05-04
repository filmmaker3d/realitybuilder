dependencies = {
    layers: [ 
        {
            name: "realitybuilder.js",
            dependencies: [
                "dojox.math", "dojox.math.matrix", "dojox.atom.io.model", 
                "dojox.date.posix", 
                "com.realitybuilder.Construction"]
        }
    ],
    prefixes: [
        ["dojox", "../dojox"], ["com", "../../com"]
    ]
};