import NewsList from '../components/NewsList/NewsList'
import NewsContainer from '../components/NewsList/NewsContainer'
import NewsFilters from '../components/NewsList/NewsFilters'
import { RecoilRoot } from 'recoil'

export default function Home() {
  return (
    <RecoilRoot>
      <NewsContainer>
        <NewsFilters />
        <NewsList />
      </NewsContainer>
    </RecoilRoot>
  )
}
