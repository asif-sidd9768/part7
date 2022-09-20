import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  const user = {
    name: 'picaboo',
    username: 'chocloare'
  }
  const blog = {
    title: 'abra ka dabra',
    author: 'unknown',
    url: 'asifsiddique.in/blogs',
    likes: 102,
    user: {
      name: 'kylie',
      username: 'pyloid'
    }
  }

  beforeEach(() => {
    container = render(
      <Blog blog={blog} user={user} />
    ).container
  })

  test('at first only render title and author', () => {
    const div = container.querySelector('.blogDetail')
    expect(div).toHaveTextContent(
      'abra ka dabra'
    )
    expect(div).toHaveTextContent(
      'unknown'
    )
    expect(div).not.toHaveTextContent(
      'asifsiddique.in/blogs'
    )

    expect(div).not.toHaveTextContent(
      '102'
    )
  })

  test('likes and url displayed after button click', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.blogDetail')
    expect(div).toHaveTextContent('asifsiddique.in/blogs')
    expect(div).toHaveTextContent('102')
  })
})
