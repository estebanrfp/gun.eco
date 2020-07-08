import express from 'express'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.static('dev'))

app.get('**', async (req, res) => {
  try {
    const index = fs.readFileSync('dev/index.html', 'utf8')
    res.set('Cache-Control', 'public, max-age=600, s-maxage=1200')
    res.send(index)
  } catch (e) {
    console.log(e)
  }
})

app.listen(process.env.PORT || process.argv[2] || 8080, () => {
  console.log(`Server started on port ${ process.env.PORT }`)
})
