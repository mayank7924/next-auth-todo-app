const crypto = require("crypto");

export const hash = (input) => {
  const hashedValue = crypto.createHash("sha256").update(input).digest("hex");
  return hashedValue;
};
