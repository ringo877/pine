import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const votes = pgTable('votes', {
  id:              serial('id').primaryKey(),
  createdAt:       timestamp('created_at').defaultNow().notNull(),
  name:            text('name').notNull(),
  tel:             text('tel').notNull(),
  email:           text('email').notNull(),
  media:           text('media').notNull(),
  character:       text('character').notNull(),
  characterReason: text('character_reason'),
  story:           text('story').notNull(),
  storyReason:     text('story_reason'),
  impression:      text('impression'),
})
