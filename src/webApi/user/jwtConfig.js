const verifyOptions = {
    expiresIn:  "12h",
    algorithm:  ["RS256"]
};

const signOptions = {
    expiresIn:  "12h",
    algorithm:  "RS256"
};

export { verifyOptions, signOptions }
