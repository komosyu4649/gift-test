import React from 'react'
import style from '@/styles/Article.module.scss'
import titleStyle from '@/styles/Title.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { MicrocmsArticlesData } from '@/types/microcms'
import { formatDate } from '@/lib/dayjs'

type Props = {
  contents: Pick<MicrocmsArticlesData, 'id' | 'image' | 'title' | 'description' | 'publishedAt'>[]
}

export const ArticlesMain: React.FC<Props> = ({ contents }) => {
  return (
    <section className={style.articles}>
      <h1 className={`${titleStyle.default} ${style.articlesTitle}`}>記事一覧</h1>
      <div className={style.articlesMain}>
        <ul className={style.articlesMainList}>
          {contents.map((content) => (
            <li className={style.articlesMainItem} key={content.id}>
              <Link href={content.id} className={style.articlesMainItemLink}>
                <Image
                  src={content.image.url}
                  alt={content.title}
                  height={content.image.height}
                  width={content.image.width}
                  className={style.articlesMainItemImage}
                />
                <div className={style.articlesMainItemContent}>
                  <h2 className={style.articlesMainItemContentTitle}>{content.title}</h2>
                  <p className={style.articlesMainItemContentDescription}>{content.description}</p>
                  <div className={style.articlesMainItemContentTime}>
                    <time className={style.articlesMainItemContentTimeInside}>
                      {formatDate(content.publishedAt)}
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
  )
}
