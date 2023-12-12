const burger = document.querySelector('.burger')

if (burger) {
  burger.addEventListener('click', e => {
    e.preventDefault()

    burger.classList.toggle('active')
  })
}

// if (window.location.pathname === '/ui.html') {
//   document.querySelectorAll('.ui__content').forEach((i, index) => {
//     i.style.display = index === 0 ? '' : 'none'
//   })
// }

document.querySelectorAll('.ui__aside a').forEach(i => {
  i.addEventListener('click', e => {
    if (e.target.getAttribute('href') === '#all') {
      document
        .querySelectorAll('.ui__content')
        .forEach(i => (i.style.display = ''))
    } else {
      document.querySelectorAll('.ui__content').forEach((i, index) => {
        i.style.display =
          i.getAttribute('id') === e.target.getAttribute('href').substring(1)
            ? ''
            : 'none'

        setTimeout(() => {
          window.scrollTo(0, 0)
        }, 0)
      })
    }
  })
})
