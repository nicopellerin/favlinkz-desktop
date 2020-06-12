export interface Feed {
  created: Date
  feed: string
  id: string
  image: string
  title: string
  url: string
}

export interface ParsedFeed {
  id: string
  title: string
  link: string
  description: string
  items: any
  contentSnippet: string
}
