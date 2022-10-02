export type FunctionWithArguments = (...args: any) => any

export type SelectInput = (value: string) => void

export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export interface EntryProps {
  value: string
  searched: string
  selectInput: SelectInput
}
