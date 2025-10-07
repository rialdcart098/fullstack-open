const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('./utils/list_helper')

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]
  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422b891b54a676234d17f9',
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen',
      url: 'https://mitpress.mit.edu/books/introduction-algorithms-third-edition',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422ba71b54a676234d17fa',
      title: 'The Art of Computer Programming',
      author: 'Donald E. Knuth',
      url: 'https://www-cs-faculty.stanford.edu/~knuth/taocp.html',
      likes: 20,
      __v: 0
    },
    {
      _id: '5a422bc71b54a676234d17fb',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      url: 'https://www.investigatii.md/uploads/resurse/Clean_Code.pdf',
      likes: 15,
      __v: 0
    },
    {
      _id: '5a422be71b54a676234d17fc',
      title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
      author: 'Erich Gamma',
      url: 'https://www.oreilly.com/library/view/design-patterns-elements/0201633612/',
      likes: 18,
      __v: 0
    },
    {
      _id: '5a422cfc1b54a676234d17fd',
      title: 'Refactoring: Improving the Design of Existing Code',
      author: 'Martin Fowler',
      url: 'https://martinfowler.com/books/refactoring.html',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422cfc8719231r2323f76234d17fd',
      title: 'AI is amazing',
      author: 'Erich Gamma',
      url: 'https://pornhub.com/',
      likes: 10,
      __v: 0
    },
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
  test('when list has multiple blogs, combine the likes of them.', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    assert.strictEqual(result, 90)
  })
  test('which blog has the most likes', () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs)
    const title = result.title
    assert.deepStrictEqual(title, 'The Art of Computer Programming')
  })
  test('which author has the most blogs', () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs)
    assert.deepStrictEqual(result, {
      author: 'Erich Gamma',
      blogs: 2
    })
  })
  test('which author has the most likes', () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs)
    assert.deepStrictEqual(result, { author: 'Erich Gamma', likes: 28 })
  })
})