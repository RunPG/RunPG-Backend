import GuildMember from './GuildMember'

export default interface GuildInfo {
  id: number,
  name: string,
  description: string,
  members: GuildMember[]
}
