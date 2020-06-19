import styles from './News.module.scss'

const NewsContainer = ({ children }) => {
  return <section className={styles.news}>{children}</section>
}

export default NewsContainer
