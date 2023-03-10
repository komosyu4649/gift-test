import { formatDate } from '@/lib/dayjs'
import { getMicroCMSData, getMicroCMSDataList } from '@/lib/microcms/getData'
import { MicrocmsArticlesData } from '@/types/microcms'
import { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import style from '@/styles/ArticlePost.module.scss'
import titleStyle from '@/styles/Title.module.scss'
import { MICROCMS_ENDPOINT_ARTICLES } from '@/constants'

type Props = {
  content: MicrocmsArticlesData
}

export const getStaticPaths = async () => {
  const microcmsArticlesData = await getMicroCMSDataList(MICROCMS_ENDPOINT_ARTICLES)
  const { contents } = microcmsArticlesData
  const paths = contents.map((content) => `/articles/${content.id}`)
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (typeof params?.id !== 'string') {
    throw new Error()
  }
  const id: string = params?.id
  const microcmsArticlesData = await getMicroCMSData(MICROCMS_ENDPOINT_ARTICLES, id)
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
              <span className={style.articleHeaderContenTimeSub}>??????????????????</span>
            </div>
          </div>
        </div>
        <div className={style.articleBody} dangerouslySetInnerHTML={{ __html: content.body }}></div>
        <button className={style.articleBackButton} onClick={handleBackPage}>
          ???????????????
        </button>
      </article>
    </main>
  )
}

export default ArticlePost
