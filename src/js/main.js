const burger = document.querySelector('.ui .burger')

import form from './form.js'

window.addEventListener('DOMContentLoaded', () => {
  form()
})

if (burger) {
  burger.addEventListener('click', e => {
    e.preventDefault()

    burger.classList.toggle('active')
  })
}

const headerBurger = document.querySelector('.header__burger')
const headerMobile = document.querySelector('.header__mobile')

if (headerBurger && headerMobile) {
  headerBurger.addEventListener('click', e => {
    e.preventDefault()

    document.body.style.overflow = headerBurger.classList.contains('active')
      ? ''
      : 'hidden'

    headerBurger.classList.toggle('active')
    headerMobile.classList.toggle('active')
  })
}

console.log(document.querySelector('img'))

fetch(document.querySelector('img').src)
  .then(response => response.blob())
  .then(blob => {
    var fileSizeInBytes = blob.size
    var fileSizeInKB = fileSizeInBytes / 1024

    console.log('Размер изображения в килобайтах:', fileSizeInKB + ' KB')
  })
  .catch(error => {
    console.error('Произошла ошибка при загрузке изображения:', error)
  })

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
