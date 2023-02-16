import { formatDate } from '@/lib/dayjs'
import { getMicroCMSData, getMicroCMSDataList } from '@/lib/microcms/getData'
import { MicrocmsArticlesData } from '@/types/microcms'
import { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import style from '@/styles/ArticlePost.module.scss'
import titleStyle from '@/styles/Title.module.scss'

type Props = {
  content: MicrocmsArticlesData
}

export const getStaticPaths = async () => {
  const microcmsArticlesData = await getMicroCMSDataList('articles')
  // console.log(microcmsArticlesData)
  const { contents } = microcmsArticlesData
  const paths = contents.map((content) => `/articles/${content.id}`)
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const id: string | string[] | undefined = params?.id
  const microcmsArticlesData = await getMicroCMSData('articles', id)
  return {
    props: {
      content: microcmsArticlesData,
    },
  }
}

const ArticlePost: NextPage<Props> = ({ content }) => {
  const router = useRouter()
  const handleBackPage = () => {
    router.back()
  }
  return (
    <main className={style.main}>
      <article className={style.article}>
        <div className={style.articleHeader}>
          <Image
            src={content.image.url}
            alt={content.title}
            height={content.image.height}
            width={content.image.width}
            className={style.articleHeaderThumbnail}
          />
          <div className={style.articleHeaderContent}>
            <h1 className={`${titleStyle.default} ${style.articleHeaderContentTitle}`}>
              {content.title}
            </h1>
            <div className={style.articleHeaderContenTime}>
              <time className={style.articleHeaderContenTimeInside}>
                {formatDate(content.publishedAt)}
              </time>
              <span className={style.articleHeaderContenTimeSub}>（公開日時）</span>
            </div>
          </div>
        </div>
        <div className={style.articleBody} dangerouslySetInnerHTML={{ __html: content.body }}></div>
        <button className={style.articleBackButton} onClick={handleBackPage}>
          一覧へ戻る
        </button>
      </article>
    </main>
  )
}

export default ArticlePost
