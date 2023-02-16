import { PER_PAGE } from '@/constants'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import style from '@/styles/Pagination.module.scss'

type Props = {
  totalCount: number
  pageName: string
}

export const Pagination: React.FC<Props> = ({ totalCount, pageName }) => {
  const router = useRouter()
  const allPageNumber: number = Math.ceil(totalCount / PER_PAGE)
  let pageNumber: number
  if (!router.pathname.includes('page')) {
    pageNumber = 1
  } else {
    pageNumber = Number(router.query.id)
  }
  const paginationGenerator = (pageNumber: number, allPageNumber: number, width = 2) => {
    const left = pageNumber - width
    const right = pageNumber + width + 1
    const ranges = []
    const rangeWithDots: any = []
    let length: number
    for (let i = 1; i <= allPageNumber; i += 1) {
      if (i === 1 || i === allPageNumber || (i >= left && i <= right)) {
        ranges.push(i)
      } else if (i < left) {
        i = left - 1
      } else if (i > right) {
        ranges.push(allPageNumber)
        break
      }
    }
    ranges.forEach((range) => {
      if (length) {
        if (range - length === 2) {
          rangeWithDots.push(length + 1)
        } else if (range - length !== 1) {
          rangeWithDots.push('...')
        }
      }
      rangeWithDots.push(range)
      length = range
    })
    return rangeWithDots
  }

  return (
    <>
      {allPageNumber > 1 && (
        <nav className={style.container}>
          <Link
            href={`/${pageName}/page/${pageNumber - 1}`}
            className={`${style.prev} ${style.itemLink} ${pageNumber === 1 && style.current}`}
          >
            <svg
              width='8'
              height='14'
              viewBox='0 0 8 14'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M7 1L1 7L7 13' stroke='white' />
            </svg>
          </Link>
          <ul className={style.list}>
            {paginationGenerator(pageNumber, allPageNumber).map((page: number, index: number) => (
              <li key={index} className={style.item}>
                {typeof page === 'number' ? (
                  <Link
                    href={`/articles/page/${page}`}
                    className={`${style.itemLink} ${page === pageNumber && style.current}`}
                  >
                    {page}
                  </Link>
                ) : (
                  <span className={style.itemDott}>{page}</span>
                )}
              </li>
            ))}
          </ul>
          <Link
            href={`/${pageName}/${pageNumber + 1}`}
            className={`${style.prev} ${style.itemLink} ${
              pageNumber === allPageNumber && style.current
            }`}
          >
            <svg
              width='8'
              height='14'
              viewBox='0 0 8 14'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M1 13L7 7L0.999999 1' stroke='white' />
            </svg>
          </Link>
        </nav>
      )}
    </>
  )
}
