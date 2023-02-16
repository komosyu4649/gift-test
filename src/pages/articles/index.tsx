import { getMicroCMSData } from '@/lib/microcms/getData'
import { MicrocmsArticlesData } from '@/types/microcms'
import { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import style from './page.module.scss'

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
    <main>
      <section className={style.container}>
        <h1 className={style.title}>記事一覧</h1>
        <div className={style.main}>
          <ul className={style.mainList}>
            {microcmsArticlesContents.map((content) => (
              <li className={style.mainItem} key={content.id}>
                <Link href={content.id} className={style.mainItemLink}>
                  <Image
                    src={content.image.url}
                    alt={content.title}
                    height={content.image.height}
                    width={content.image.width}
                    className={style.mainItemImage}
                  />
                  <div className={style.mainItemContent}>
                    <h2 className={style.mainItemContentTitle}>{content.title}</h2>
                    <p className={style.mainItemContentDescription}>{content.description}</p>
                    <div className={style.mainItemContentTime}>
                      <time className={style.mainItemContentTimeInside}>{content.publishedAt}</time>
                      <span className={style.mainItemContentTimeSub}>（公開日時）</span>
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
