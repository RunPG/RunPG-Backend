import { Spell } from '@prisma/client'
import { prismaMock } from '../../../prismaMock'
import { spellRepository } from '../../../repository'
import { spell1, spell2 } from '../../testData'

/**
 * Spell repository unit test
 *
 * @group unit/repository/spell
 */

test('getAllSpells should return an array of spells', async () => {
  const expected: Spell[] = [spell1, spell2]

  prismaMock.spell.findMany.mockResolvedValue(expected)

  const result = await spellRepository.getAllSpells()

  expect(result).toEqual(expected)
})

test('getById should return the spell which corresponds to the id', async () => {
  prismaMock.spell.findUnique.mockResolvedValue(spell1)

  const result = await spellRepository.getById(spell1.id)

  expect(result).toEqual(spell1)
})

test('getById should return null when the spell is not found', async () => {
  prismaMock.spell.findUnique.mockResolvedValue(null)

  const result = await spellRepository.getById(spell1.id)

  expect(result).toEqual(null)
})

test('getByName should return the spell which corresponds to the name', async () => {
  prismaMock.spell.findUnique.mockResolvedValue(spell1)

  const result = await spellRepository.getByName(spell1.name)

  expect(result).toEqual(spell1)
})

test('getByName should return null when the spell is not found', async () => {
  prismaMock.spell.findUnique.mockResolvedValue(null)

  const result = await spellRepository.getByName(spell1.name)

  expect(result).toEqual(null)
})
