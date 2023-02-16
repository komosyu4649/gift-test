import { getMicroCMSDataList } from '@/lib/microcms/getData'
import { MicrocmsArticlesData } from '@/types/microcms'
import { GetStaticProps, NextPage } from 'next'
import style from '@/styles/Article.module.scss'
import { PER_PAGE } from '@/constants'
import { Pagination } from '@/components/Pagination'
import { ArticlesMain } from '@/components/ArticlesMain'

type Props = {
  contents: Pick<MicrocmsArticlesData, 'id' | 'image' | 'title' | 'description' | 'publishedAt'>[]
  totalCount: number
}

export const getStaticPaths = async () => {
  const microcmsArticlesData = await getMicroCMSDataList('articles')
  const { totalCount } = microcmsArticlesData

  const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i)

  const paths = range(1, Math.ceil(totalCount / PER_PAGE)).map((repo) => `/articles/page/${repo}`)
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const id: number = Number(params?.id)
  const microcmsArticlesData = await getMicroCMSDataList('articles', (id - 1) * PER_PAGE, PER_PAGE)
  const { contents, totalCount } = microcmsArticlesData
  return {
    props: {
      contents,
      totalCount,
    },
  }
}

const Articles: NextPage<Props> = ({ contents, totalCount }) => {
  return (
    <main className={style.main}>
      <ArticlesMain contents={contents} />
      <Pagination totalCount={totalCount} pageName='articles' />
    </main>
  )
}

export default Articles
