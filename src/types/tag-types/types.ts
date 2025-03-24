export const singleTags = ['br', 'img', 'input'] as const

export type SingleTagTypes = (typeof singleTags)[number]
