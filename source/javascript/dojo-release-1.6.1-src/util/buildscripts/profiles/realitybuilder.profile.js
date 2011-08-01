dependencies = {
    layers: [ 
        {
            name: "dojo.js", // if not "dojo.js", then 2 files would be created
            dependencies: [
                "dojox.math", 
                "dojox.math.matrix", 
                "dojox.atom.io.model", 
                "dojox.date.posix", 
                "com.realitybuilder.Construction"]
        }
    ],
    prefixes: [
        ["dojox", "../dojox"], 
        ["com", "../../com"]
    ]
};
