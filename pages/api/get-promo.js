import { GoogleSpreadsheet } from 'google-spreadsheet'
import { fromBase64 } from '../../utils/base64'
const credentials = require('../../credentials.json')

const doc = new GoogleSpreadsheet('1NOw-NZ_T9KFw85DeCnz7eAz5ecY4w6kSk4ite5834uU')

export default async (req, res) => {  
  try {
    await doc.useServiceAccountAuth(credentials)
    await doc.loadInfo()

    const sheet = doc.sheetsByIndex[2]
    await sheet.loadCells('A2:B2')

    const mostrarPromocaoCell = sheet.getCell(1, 0)
    const textoCell = sheet.getCell(1, 1)

    res.end(JSON.stringify({
      showCoupon: mostrarPromocaoCell.value === 'VERDADEIRO',
      message: textoCell.value
    }))

  } catch (err) {
    res.end(JSON.stringify({
      showCoupon: false,
      message: ''
    }))
  }

}