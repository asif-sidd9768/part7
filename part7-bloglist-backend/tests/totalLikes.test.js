const totalLikes = require('../utils/list_helper').totalLikes

describe('total likes', () => {

  test('of empty list is zero', () => {
    const blogs = []

    expect(totalLikes(blogs)).toBe(0)
  })

  test('when list has only one blogs equals the likes of that', () => {
    const blogs = {
      _id: '62dc38338c0d954c1b811504',
      title: 'The man down there',
      author: 'Blote Hicky',
      url: 'asifsiddique.in/blogs',
      likes: 3201,
      __v: 0
    }

    expect(totalLikes(blogs)).toBe(3201)
  })

  test('few likes', () => {
    const blogs = [{
      _id: '62dc38338c0d954c1b811504',
      title: 'The man down there',
      author: 'Blote Hicky',
      url: 'asifsiddique.in/blogs',
      likes: 3201,
      __v: 0
    },
    {
      _id: '62dcf8ab542f06283e0f993e',
      title: 'Black omit',
      author: 'Poling Wenty',
      url: 'asifsiddique.in/blogs',
      likes: 432,
      __v: 0
    }]

    expect(totalLikes(blogs)).toBe(3633)
  })
})