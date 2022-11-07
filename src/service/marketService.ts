import { Inventory, Market, PrismaPromise } from '@prisma/client'
import { characterRepository, inventoryRepository, marketRepository, userRepository } from '../repository'
import prisma from '../repository/client'

export async function getAllOpenItems(): Promise<Market[]> {
  return marketRepository.getAllOpenItems()
}

export async function getItemById(id: number): Promise<Market | null> {
  return marketRepository.getById(id)
}

export async function createItem(inventoryId: number, goldPrice: number, stackSize = 1): Promise<Market | null> {
  const inventory = await inventoryRepository.getById(inventoryId)
  if (inventory == null || inventory.stackSize < stackSize) {
    return null
  }

  const updateInventory = inventoryRepository.updateQuantity(inventory.id, inventory.stackSize - stackSize)
  const createMarketItem = marketRepository.createItem(inventory, goldPrice, stackSize)

  const [_, marketItem] = await prisma.$transaction([
    updateInventory,
    createMarketItem
  ])

  return marketItem
}

export async function buyItem(marketItemId: number, buyerId: number): Promise<boolean | null> {
  const marketItem = await marketRepository.getById(marketItemId)
  const buyer = await characterRepository.getByUserId(buyerId)
  if (marketItem == null || buyer == null ) {
    return null
  }
  if (marketItem.isSold || buyer.gold == null || buyer.gold < marketItem.goldPrice) {
    return false
  }
  const seller = await characterRepository.getByUserId(marketItem.sellerId)

  let updateInventory: PrismaPromise<Inventory>
  if (marketItem.itemId != null) {
    const inventory = await inventoryRepository.getByUserIdAndItemId(buyerId, marketItem.itemId)
    if (inventory != null) {
      updateInventory = inventoryRepository.updateQuantity(inventory.id, inventory.stackSize + marketItem.stackSize)
    } else {
      updateInventory = inventoryRepository.createItem(buyerId, marketItem.itemId, marketItem.stackSize)
    }
  } else if (marketItem.equipmentId != null) {
    const inventory = await inventoryRepository.getByUserIdAndEquipmentId(buyerId, marketItem.equipmentId)
    if (inventory != null) {
      updateInventory = inventoryRepository.updateQuantity(inventory.id, inventory.stackSize + marketItem.stackSize)
    } else {
      updateInventory = inventoryRepository.createEquipment(buyerId, marketItem.equipmentId)
    }
  } else {
    console.error(`Market item ${marketItemId} has no item or equipment`)
    await marketRepository.removeItem(marketItemId)
    return false
  }

  const updateBuyer = userRepository.updateGold(buyerId, buyer.gold - marketItem.goldPrice)
  const updateSeller = userRepository.updateGold(seller!.id, (seller!.gold ?? 0) + marketItem.goldPrice)
  const closeMarketItem = marketRepository.buyItem(marketItemId)

  await prisma.$transaction([
    updateInventory,
    updateSeller,
    updateBuyer,
    closeMarketItem
  ])

  return true
}

export async function getByEquipmentBaseId(equipmentBaseId: number): Promise<Market[]> {
  return marketRepository.getByEquipmentBaseId(equipmentBaseId)
}

export async function getByItemId(itemId: number): Promise<Market[]> {
  return marketRepository.getByItemId(itemId)
}
