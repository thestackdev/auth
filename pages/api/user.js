import clientPromise from 'lib/mongodb'
import { getToken } from 'next-auth/jwt'

export default async function (req, res) {
  const client = await clientPromise
  const usersCollection = client.db('auth').collection('users')

  const token = await getToken({ req })

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  switch (req.method) {
    case 'POST':
      const { name } = req.body
      await usersCollection.updateOne({ _id: token.sub }, { $set: { name } })

      res.status(201).send('ok')
      break
    default:
      res.status(400).json({ message: 'Bad request' })
      break
  }
}
