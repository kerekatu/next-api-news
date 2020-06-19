import { useRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'

const NewsItem = () => {
  const router = useRouter()

  return <div>{router.query.slug}</div>
}

export default NewsItem
