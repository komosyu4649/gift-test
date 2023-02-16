export type GetType<T> = {
  contents: T[]
  totalCount: number
  offset: number
  limit: number
}

export type DateType = {
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
}

export type BaseStructure<T> = { id: string } & DateType & T
export type ContentStructure<T> = GetType<{ id: string } & DateType & T>
