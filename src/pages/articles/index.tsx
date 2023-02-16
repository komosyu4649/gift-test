import { getMicroCMSDataList } from '@/lib/microcms/getData'
import { MicrocmsArticlesData } from '@/types/microcms'
import { GetStaticProps, NextPage } from 'next'
import style from '@/styles/Article.module.scss'
import { ArticlesMain } from '@/components/ArticlesMain'
import { MICROCMS_ENDPOINT_ARTICLES, PER_PAGE } from '@/constants'
import { Pagination } from '@/components/Pagination'

type Props = {
  contents: Pick<MicrocmsArticlesData, 'id' | 'image' | 'title' | 'description' | 'publishedAt'>[]
  totalCount: number
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const id: number = Number(params?.id)
  const microcmsArticlesData = await getMicroCMSDataList(
    MICROCMS_ENDPOINT_ARTICLES,
    (id - 1) * PER_PAGE,
    PER_PAGE,
  )
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
