const fetchFromCMS = async <T>(
  endpoint: string,
  { headers, ...rest }: RequestInit = {},
): Promise<T> => {
  const req = await fetch(`${process.env.CMS_API_URL}${endpoint}`, {
    headers: {
      ...(headers ?? {}),
      Authorization: `users API-Key ${process.env.CMS_API_KEY}`,
    },
    ...rest,
  });
  return req.json() as T;
};

export default fetchFromCMS;
