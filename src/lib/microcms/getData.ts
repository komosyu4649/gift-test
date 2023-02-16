import { client } from '.'

export const getMicroCMSData = async (
  contentId: string,
  offsetNumber?: number,
  limitNumber?: number,
) => {
  const res = await client.getList({
    endpoint: contentId,
    queries: {
      offset: offsetNumber,
      limit: limitNumber,
    },
  })
  return res
}
