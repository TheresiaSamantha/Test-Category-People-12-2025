import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS) || 10);

export function hashPassword(input: string) {
  return bcrypt.hashSync(input, salt);
}

export function comparePassword(input: string, data: string) {
  return bcrypt.compareSync(input, data);
}
