import { NUXTGRAM } from '../../app/data/contacts'

export default defineEventHandler((event) => sendRedirect(event, NUXTGRAM))
