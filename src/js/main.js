import create from './forms/create.js'
import subscribe from './forms/subscribe.js'
import dev from './dev.js'

dev()

const burger = document.querySelector('.ui .burger')

console.log(process.env.API_SECRET)

window.addEventListener('DOMContentLoaded', () => {
  create()
  subscribe()
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

// fetch(document.querySelector('img').src)
//   .then(response => response.blob())
//   .then(blob => {
//     var fileSizeInBytes = blob.size
//     var fileSizeInKB = fileSizeInBytes / 1024

//     console.log('Размер изображения в килобайтах:', fileSizeInKB + ' KB')
//   })
//   .catch(error => {
//     console.error('Произошла ошибка при загрузке изображения:', error)
//   })

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
          window.scrollTo(0, 10)
        }, 0)
      })
    }
  })
})

if (document.startViewTransition) {
  window.addEventListener('click', () => {
    // document.startViewTransition(async () => {
    //   document.querySelector('.categories__list').classList.toggle('active')
    // })
    // const categories = document.querySelectorAll('.category')
    //   categories.forEach(category => {
    //     if (Math.random() > 0.5) {
    //       category.style.display = 'none'
    //     } else {
    //       category.style.display = ''
    //     }
    //   })
  })
}

const tabs = document.querySelectorAll('.tabs__item')

if (tabs.length) {
  tabs.forEach(tab => {
    tab.addEventListener('click', e => {
      e.preventDefault()

      tabs.forEach(i => i.classList.remove('active'))
      tab.classList.add('active')
    })
  })
}

const timer = document.querySelector('.timer')

if (timer) {
  const getTimeUntilNextDay = () => {
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(now.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)

    const timeUntilNextDay = tomorrow - now

    const hours = Math.floor(timeUntilNextDay / (1000 * 60 * 60))
    const minutes = Math.floor(
      (timeUntilNextDay % (1000 * 60 * 60)) / (1000 * 60)
    )
    const seconds = Math.floor((timeUntilNextDay % (1000 * 60)) / 1000)

    return { hours, minutes, seconds }
  }

  const updateTimer = () => {
    const timer = getTimeUntilNextDay()

    document.querySelector('.timer__hour').textContent = timer.hours
    document.querySelector('.timer__minute').textContent = timer.minutes
    document.querySelector('.timer__second').textContent = timer.seconds
  }

  setInterval(updateTimer, 1000)

  updateTimer()
}
