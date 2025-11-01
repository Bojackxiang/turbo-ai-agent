export const getSecretValue = async () => {
  await Promise.resolve(setTimeout(() => {}, 2000));
  return "super_secret_value";
};

export const upsertSecret = async (secretName: string, secretValue: string) => {
  await Promise.resolve(setTimeout(() => {}, 1000));
};
