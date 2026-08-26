import { GITHUB } from '../../app/data/contacts'

export default defineEventHandler((event) => sendRedirect(event, GITHUB))
