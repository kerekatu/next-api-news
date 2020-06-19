import styles from './News.module.scss'
import { useRecoilState } from 'recoil'
import { filtersAtom } from '../../atoms/filtersAtom'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const NewsFilters = () => {
  const [filters, setFilters] = useRecoilState(filtersAtom)

  const categories = [
    'Movies',
    'Tech',
    'Privacy',
    'Politics',
    'Animation',
    'Books'
  ]

  return (
    <div className={styles.news__filters}>
      <div className={styles.news__search}>
        <input
          type="text"
          className={styles.news__searchbar}
          placeholder="Search for keywords..."
          id="news-searchbar"
          onChange={(e) =>
            e.target.value.length >= 3 &&
            setFilters({
              ...filters,
              currentPage: 1,
              search: e.target.value
            })
          }
        />

        {filters.search.length >= 3 && (
          <button
            onClick={() => {
              setFilters({ ...filters, search: '' })
              document.querySelector('#news-searchbar').value = ''
            }}
            className={styles.news__icon}
          >
            <Icon icon={faTimes} />
          </button>
        )}
      </div>
      <select
        onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
        className={styles.news__dropdown}
      >
        <option value="relevancy">Relevant</option>
        <option value="publishedAt">Newest</option>
        <option value="popularity">Popular</option>
      </select>

      <div className={styles.news__categories}>
        {categories.map((category, index) => (
          <button
            className={
              filters.category === category && filters.search === ''
                ? `${styles.news__btn} ${styles.news__btn_active}`
                : `${styles.news__btn}`
            }
            key={index}
            onClick={() => {
              setFilters({ ...filters, search: '', currentPage: 1, category })
              document.querySelector('#news-searchbar').value = ''
            }}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}

export default NewsFilters
