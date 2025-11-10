const lodash = require('lodash')

const dummy = blogs => {
  return 1
}
const totalLikes = blog => {
  return blog.reduce((sum, item) => sum + item.likes, 0)
}
const favoriteBlog = blogs => {
  if (blogs.length === 0) return {}
  const max = Math.max(...blogs.map(blog => blog.likes))
  return blogs.filter(blog => blog.likes === max)[0]
}
const mostBlogs = blogs => {
  if (blogs.length === 0) return {}
  const authors = lodash.countBy(blogs, 'author')
  const [author, blogsCount] = lodash.maxBy(
    lodash.toPairs(authors),
    pair => pair[1]
  )
  return { author, blogs: blogsCount }
}
const mostLikes = blogs => {
  if (blogs.length === 0) return {}
  const authors = lodash.groupBy(blogs, 'author')
  const mergedAuthors = lodash.map(authors, (items, author) => {
    return { author: author, likes: lodash.sumBy(items, 'likes') }
  })
  const { author, likes } = lodash.maxBy(mergedAuthors, 'likes')
  return { author, likes }
}
module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }