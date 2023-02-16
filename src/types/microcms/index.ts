import { BaseStructure } from './utiles'

export type MicrocmsArticlesData = BaseStructure<{
  title: string
  description: string
  image: {
    url: string
    height: number
    width: number
  }
  body: string
}>
