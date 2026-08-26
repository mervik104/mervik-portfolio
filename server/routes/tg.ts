import { TELEGRAM } from '../../app/data/contacts'

export default defineEventHandler((event) => sendRedirect(event, TELEGRAM))
