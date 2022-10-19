import { HeroClass } from '@prisma/client'

export default interface GuildMember {
  id: number,
  name: string,
  heroClass: HeroClass,
  isOwner: boolean,
  level: number
}
