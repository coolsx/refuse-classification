// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    var tmpAllMsg = await db.collection('rubbish').doc('5d196d182432341a261ef854').get()
    return {
        tmpAllMsg
    }
}