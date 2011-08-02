dependencies = {
    layers: [{
        name: "dojo.js", // if not "dojo.js", then 2 files would be created and
                         // scopeMap fails
        dependencies: [
            "dojox.math", 
            "dojox.math.matrix", 
            "dojox.atom.io.model", 
            "dojox.date.posix", 
            "realitybuilder.Construction"]
    }
            ],
    prefixes: [
        ["dojox", "../dojox"], 
        ["realitybuilder", "../../realitybuilder"]
    ]
};
