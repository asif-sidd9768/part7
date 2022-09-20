describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Square Pants',
      username: 'sponge',
      password: 'test12345'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() {
    cy.contains('Login')
  })

  describe('Login', function() {
    it('succeeds with the correct credentials', function() {
      cy.get('#username').type('sponge')
      cy.get('#password').type('test12345')
      cy.get('#login-button').click()

      cy.contains('Square Pants logged in')
    })

    it('fails the wrong credentials', function() {
      cy.get('#username').type('abcd')
      cy.get('#password').type('abcd')
      cy.get('#login-button').click()

      cy.get('.error').contains('wrong username or password')
    })
  })

  describe ('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'sponge', password: 'test12345' })

      cy.contains('add new blog').click()
      cy.createBlog({
        title: 'Oogie boogie boo',
        author: 'Maddy Keddy',
        url: 'asifsiddique.in/blogs'
      })
    })

    it('A blog can be liked', function() {
      cy.contains('Oogie boogie boo')
        .contains('view')
        .click()
      cy.contains('like').click()
      cy.get('.success').contains('you have liked')
    })

    it('A blog can be deleted', function() {
      cy.contains('Oogie boogie boo')
        .contains('view')
        .click()
      cy.contains('delete').click()
      cy.contains('Successfully deleted')
    })

    it('Blog order', function() {
      cy.contains('add new blog').click()
      cy.createBlog({
        title: 'Joker Moker Poker',
        author: 'Shane Joker',
        url: 'asifsiddique.in/blogs',
        likes: 23
      })
    })
  })
})