import crypto from "crypto"

// generate random seed
export function generateServerSeed() {
  return crypto.randomBytes(32).toString("hex")
}

// create commit hash
export function createCommit(serverSeed, nonce) {
  return crypto
    .createHash("sha256")
    .update(`${serverSeed}:${nonce}`)
    .digest("hex")
}

// combine seeds
export function createCombinedSeed(serverSeed, clientSeed, nonce) {
  return crypto
    .createHash("sha256")
    .update(`${serverSeed}:${clientSeed}:${nonce}`)
    .digest("hex")
}