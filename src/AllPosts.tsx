import { useParams } from 'react-router-dom'

export default function AllPosts() {
  const { pageNumber } = useParams()
  return <h1>All Posts; page {pageNumber}</h1>
}
