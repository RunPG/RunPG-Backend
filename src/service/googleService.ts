import { User } from '@prisma/client'
import { fitness_v1, google } from 'googleapis'
import moment from 'moment'

const DAY_IN_MILLISECONDS = moment.duration(1, 'day').asMilliseconds()
const fitness = google.fitness('v1')

export async function authenticateUser(authCode: string): Promise<string | null> {
  if (authCode === 'editor') {
    return null
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    ''
  )

  const { tokens } = await oauth2Client.getToken(authCode)

  return tokens.refresh_token ?? null
}

export async function getAccessCode(refreshCode: string): Promise<string | null> {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    ''
  )

  oauth2Client.setCredentials({
    refresh_token: refreshCode
  })

  const response = await oauth2Client.refreshAccessToken()

  return response.credentials.access_token ?? null
}

export async function getCalories(user: User): Promise<number> {
  if (user.refreshToken == null) {
    return 0
  }

  const accessToken = await getAccessCode(user.refreshToken)
  if (accessToken == null) {
    throw new Error('Couldn\'t get access token')
  }

  let xp = 0
  let startTime = user.lastCaloriesUpdate.getTime()
  const endTime = Date.now()

  for (; startTime < endTime; startTime += DAY_IN_MILLISECONDS) {
    const res = await fitness.users.dataset.aggregate({
      access_token: accessToken,
      userId: 'me',
      requestBody: {
        aggregateBy: [{
          dataTypeName: 'com.google.calories.expended',
          dataSourceId: 'derived:com.google.calories.expended:com.google.android.gms:merge_calories_expended'
        }],
        bucketByTime: {
          durationMillis: DAY_IN_MILLISECONDS
        },
        startTimeMillis: startTime,
        endTimeMillis: startTime + DAY_IN_MILLISECONDS
      }
    } as unknown as fitness_v1.Params$Resource$Users$Dataset$Aggregate)

    res?.data?.bucket?.forEach(bucket => {
      const bucketXp = bucket?.dataset?.at(0)?.point?.at(0)?.value?.at(0)?.fpVal
      xp += bucketXp ?? 0
    })
  }

  console.log(`${user.name} gained ${xp} xp!`)

  return Math.round(xp)
}

export async function getTodayCalories(user: User): Promise<number> {
  if (user.refreshToken == null) {
    return 0
  }

  const accessToken = await getAccessCode(user.refreshToken)
  if (accessToken == null) {
    throw new Error('Couldn\'t get access token')
  }

  const startTime = new Date().setHours(0, 0, 0, 0)
  const endTime = Date.now()

  const res = await fitness.users.dataset.aggregate({
    access_token: accessToken,
    userId: 'me',
    requestBody: {
      aggregateBy: [{
        dataTypeName: 'com.google.calories.expended',
        dataSourceId: 'derived:com.google.calories.expended:com.google.android.gms:merge_calories_expended'
      }],
      bucketByTime: {
        durationMillis: endTime - startTime
      },
      startTimeMillis: startTime,
      endTimeMillis: endTime
    }
  } as unknown as fitness_v1.Params$Resource$Users$Dataset$Aggregate)

  return Math.round(res?.data?.bucket?.at(0)?.dataset?.at(0)?.point?.at(0)?.value?.at(0)?.fpVal ?? 0)
}
