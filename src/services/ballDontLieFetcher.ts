import { BalldontlieAPI } from "@balldontlie/sdk";

const getBdlAPI = () =>
  new BalldontlieAPI({
    apiKey: process.env.EXTERNAL_API_AUTHORIZATION_KEY,
  });

export const fetchPlayers = async () => {
  const api = getBdlAPI();
  let allPlayers = [];
  let cursor = 1;
  let recievedPlayers = [];
  let response;
  do {
    response = await api.nba.getPlayers({ cursor, per_page: 100 });
    allPlayers.push(...response.data);
    cursor = response.meta.next_cursor;
  } while (response.data && response.data.length > 0);
  return response.data;
};

export const fetchTeams = async () => {
  const api = getBdlAPI();
  const teams = await api.nba.getTeams();
  return teams;
};

export const fetchGames = async () => {
  const api = getBdlAPI();
  const games = await api.nba.getGames();
  return games;
};

// const fetchDataWithPagination = async () => {
//   let cursor = 1;
//   let corruptedData: { record: object; errors: ZodIssue[] }[] = [];

//   let validData: z.infer<typeof validationSchema>[] = [];

//   while (!!cursor) {
//     Object.assign(queryParams, {
//       ...queryParams,
//       cursor,
//       per_page,
//     });
//     const { data, meta } = await fetchData(endpoint, queryParams);
//     await data.forEach((record) => {
//       const validationResult = validationSchema.safeParse(record);
//       validationResult.success
//         ? validData.push(validationResult.data)
//         : corruptedData.push({ record, errors: validationResult.error.errors });
//     });
//     cursor = meta.next_cursor;
//   }

//   return { data: validData, corruptedData };
// };
