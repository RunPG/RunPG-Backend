import { Spell } from '@prisma/client'
import { spellRepository } from '../../../repository'
import { spellService } from '../../../service'
import { spell1, spell2 } from '../../testData'

/**
 * Spell service unit test
 *
 * @group unit/service/spell
 */

test('getAllSpells should return an array of spells', async () => {
  const expected: Spell[] = [spell1, spell2]

  spellRepository.getAllSpells = jest.fn(async () => {
    return expected
  })

  const result = await spellService.getAllSpells()

  expect(result).toEqual(expected)
})

test('getById should return the spell which corresponds to the id', async () => {
  spellRepository.getById = jest.fn(async () => {
    return spell1
  })

  const result = await spellService.getById(spell1.id)

  expect(result).toEqual(spell1)
})

test('getById should return null when the spell is not found', async () => {
  spellRepository.getById = jest.fn(async () => {
    return null
  })

  const result = await spellService.getById(spell1.id)

  expect(result).toEqual(null)
})

test('getByName should return the spell which corresponds to the name', async () => {
  spellRepository.getByName = jest.fn(async () => {
    return spell1
  })

  const result = await spellService.getByName(spell1.name)

  expect(result).toEqual(spell1)
})

test('getByName should return null when the spell is not found', async () => {
  spellRepository.getByName = jest.fn(async () => {
    return null
  })

  const result = await spellService.getByName(spell1.name)

  expect(result).toEqual(null)
})
