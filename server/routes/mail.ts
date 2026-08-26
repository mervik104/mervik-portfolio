import { MAIL } from '../../app/data/contacts'

export default defineEventHandler((event) => sendRedirect(event, MAIL))
