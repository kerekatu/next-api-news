import { useContext } from 'react'
import Link from 'next/link'
import styles from './News.module.scss'
import useSWR from 'swr'
import fetcher from '../../lib/fetcher'
import dateFormatter from '../../lib/dateFormatter'
import urlConventer from '../../lib/urlConventer'
import { filtersAtom } from '../../atoms/filtersAtom'
import { useRecoilState } from 'recoil'
import useDebounce from '../../hooks/useDebounce'
import { SettingsContext } from '../../context/SettingsContext'

const NewsList = () => {
  const [filters, setFilters] = useRecoilState(filtersAtom)
  const debouncedSearch = useDebounce(filters.search, 500)
  const { settings } = useContext(SettingsContext)

  const baseURL = 'https://newsapi.org/v2/everything?q='
  const { data, error } = useSWR(
    () =>
      `${baseURL}${
        debouncedSearch ? debouncedSearch : filters.category
      }&sortBy=${filters.sort}&page=${filters.currentPage}&apiKey=${
        process.env.NEXT_PUBLIC_API_KEY
      }`,
    fetcher
  )

  console.log(data)

  if (error) return <div>Could not fetch articles, try again later</div>
  if (!data) return <div>Loading...</div>

  return (
    <ul className={styles.news__list}>
      {data &&
        data.articles.map((article, index) => (
          <Link
            href="/news/[slug]"
            as={`/news/${urlConventer(article.title)}`}
            key={index}
          >
            <a className={styles.news__link}>
              <li className={styles.news__item}>
                <h3 className="heading-three">{article.title}</h3>
                <p className={styles.news__description}>
                  {article.description}
                </p>
                {settings && settings.includeImages && (
                  <img
                    src={article.urlToImage}
                    alt="Article Photo"
                    className={styles.news__img}
                  />
                )}
                <div className={styles.news__details}>
                  <span className={styles.news__text}>
                    Written by {article.author}
                  </span>
                  <span className={styles.news__text}>
                    {' '}
                    at {dateFormatter.format(Date.parse(article.publishedAt))}
                  </span>
                  <span className={styles.news__text}>
                    {' '}
                    – {article.source.name}
                  </span>
                </div>
              </li>
            </a>
          </Link>
        ))}
      {filters.currentPage > 1 && (
        <button
          onClick={() =>
            setFilters({ ...filters, currentPage: filters.currentPage - 1 })
          }
          className={
            styles.news__btn__pagination +
            ' ' +
            styles.news__btn__pagination_alt
          }
        >
          &larr; Go back
        </button>
      )}
      <button
        onClick={() =>
          setFilters({ ...filters, currentPage: filters.currentPage + 1 })
        }
        disabled={filters.currentPage * 20 >= data.totalResults}
        className={styles.news__btn__pagination}
      >
        Load More...{' '}
        {filters.currentPage * 20 <= data.totalResults && (
          <>({data.totalResults - filters.currentPage * 20})</>
        )}
      </button>
    </ul>
  )
}

export default NewsList
