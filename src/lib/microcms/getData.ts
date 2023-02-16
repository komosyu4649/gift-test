import { client } from '.'

export const getMicroCMSData = async (contentId: string) => {
  const res = await client.getList({
    endpoint: contentId,
  })
  return res
}
