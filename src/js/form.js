import { z } from 'zod'
import { formDataToObject } from './utils/form.js'
import { echoErrors, formatZodError } from './utils/formatZodError.js'

const formSchema = z.object({
  username: z.string().min(4).max(30),
  email: z.string().email().min(12).max(100),
  password: z.string().min(3).max(30),
})

export default () => {
  const form = document.querySelector('form.form')

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault()

      const formData = formDataToObject(new FormData(form))

      try {
        const res = formSchema.parse(formData)

        console.log(res)
      } catch (err) {
        if (err instanceof z.ZodError) {
          const errors = formatZodError(err)

          echoErrors(form, errors)

          console.log(errors)
        } else {
          console.error('Неожиданная ошибка валидации:')
        }
      }
    })
  }
}
