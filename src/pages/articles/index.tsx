import { getMicroCMSData } from '@/lib/microcms/getData'
import { MicrocmsArticlesData } from '@/types/microcms'
import { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import style from '@/styles/Article.module.scss'
import titleStyle from '@/styles/Title.module.scss'
import imageStyle from '@/styles/Image.module.scss'

type Props = {
  microcmsArticlesContents: Pick<
    MicrocmsArticlesData,
    'id' | 'image' | 'title' | 'description' | 'publishedAt'
  >[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const microcmsArticlesData = await getMicroCMSData('articles')
  const microcmsArticlesContents = microcmsArticlesData.contents
  return {
    props: {
      microcmsArticlesContents,
    },
  }
}

const Articles: NextPage<Props> = ({ microcmsArticlesContents }) => {
  return (
    <main className={style.main}>
      <section className={style.articles}>
        <h1 className={`${titleStyle.default} ${style.articlesTitle}`}>記事一覧</h1>
        <div className={style.articlesMain}>
          <ul className={style.articlesMainList}>
            {microcmsArticlesContents.map((content) => (
              <li className={style.articlesMainItem} key={content.id}>
                <Link href={content.id} className={style.articlesMainItemLink}>
                  <Image
                    src={content.image.url}
                    alt={content.title}
                    height={content.image.height}
                    width={content.image.width}
                    className={`${imageStyle.default} ${style.articlesMainItemImage}`}
                  />
                  <div className={style.articlesMainItemContent}>
                    <h2 className={style.articlesMainItemContentTitle}>{content.title}</h2>
                    <p className={style.articlesMainItemContentDescription}>
                      {content.description}
                    </p>
                    <div className={style.articlesMainItemContentTime}>
                      <time className={style.articlesMainItemContentTimeInside}>
                        {content.publishedAt}
                      </time>
                      <span className={style.articlesMainItemContentTimeSub}>（公開日時）</span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}

export default Articles
