import { ref } from 'vue'
import { Post } from '@/global/types'
import debounce from '@/global/utils/debounce'

const getWords = () => {
  const input = ref('')
  const toSearch = ref('')
  const makeRequest = ref(true)
  const searched = ref('')
  const searchList = ref<Post[]>([])

  const clearSearch = () => {
    input.value = ''
    toSearch.value = ''
    searched.value = ''
    searchList.value = []
    makeRequest.value = true
  }

  const selectInput = (value: string) => {
    searched.value = value
    input.value = value
    searchList.value = []
  }

  const debounceSearchInput = debounce((value: string) => {
    toSearch.value = value.toLowerCase()
  }, 200)

  const fetchWords = async (query: string) => {
    try {
      const data = await fetch(
        `https://jsonplaceholder.typicode.com/posts?title_like=^${encodeURIComponent(
          query
        )}&limit=10`,
        {
          method: 'GET',
          cache: 'force-cache',
          headers: {
            'Cache-Control': 'max-age=600',
            Accept: 'application/json'
          }
        }
      )

      searchList.value = await data.json()
      searched.value = query
    } catch (err) {
      console.log(err)
    }
  }

  return {
    input,
    toSearch,
    makeRequest,
    searched,
    searchList,
    clearSearch,
    selectInput,
    debounceSearchInput,
    fetchWords
  }
}

export default getWords
