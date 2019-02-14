export type AllowedMimeTypes = {
  file: string[]
}

export const mimeTypes = {
  file: [
    'image/jpg',
    'image/png',
    'image/jpeg',
    'application/pdf',
    'application/excel',
    'application/msword',
    'application/mspowerpoint',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.openxmlformats-application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
}

export const allowedSizes = {
  file: 10 * 1024 * 1024
}
