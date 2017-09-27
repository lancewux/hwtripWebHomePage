
const Koa = require('koa')
const mysql = require('mysql')

const conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'sl', // 数据库用户名
    password: 'sl', //密码
    database: 'hwtrip2', //数据库名
})

const connect_sql = async () => {
    await new Promise((resolve, reject) => {
        conn.connect((err) => {
            if(err) {
                console.error('error connecting: ' + err.stack)
                reject('error connecting: ' + err.stack)
            } else {
                console.log('connect successfully')
                resolve()
            }
        })
    })
}

connect_sql()

const sqlQuery = async (sql) => {
    return await new Promise((res, rej) => {
        conn.query(sql, (err, result, fields) => {
            if (err) {
                rej(err)
            } else {
                // console.log(result)
                res(result)
            }
        })
    })
}


sqlQuery('SELECT Loginname FROM t_member WHERE Loginname = "812788989@qq.com" AND LoginPwd = "AED8D6A49B4C1FFDF19E3221A56B85B2"')

const parseBody = (ctx, body) => {
    let data = ''
    if(!body) {
        return data
    }
    if (ctx.is('json')) {
        data = JSON.parse(body)
    } else if (ctx.is('text')) {
        data = body
    } else if (ctx.is('x-www-form-urlencoded')) {
        data = {}
        let urlData = body.split(';')
        for (let i = 0; i < urlData.length; i++) {
            let tmp = urlData[i].split('=')
            if(tmp.length === 2) {
                data[tmp[0]] = tmp[1]
            }
        }
    }
    return data
}

const setResHeader = (ctx) => {
    //由于Access-Control-Allow-Origin只能设置一个值，根据Referer头信息来动态设置，并且限制只能是包含hwtrip的host
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Connection, User-Agent, Cookie, withCredentials')
    // ctx.set('Access-Control-Allow-Credentials', 'true')
    ctx.set('Access-Control-Max-Age', '86400')
    // ctx.set('Set-Cookie', 'server=nodejs')
    ctx.set('Content-Type', 'application/json')
}

const reciveData = (ctx) => new Promise((resolve, reject) => {
    ctx.req.setEncoding('utf8')
    let reqBody = ''

    ctx.req.on('data', (chunk) => {
        reqBody += chunk
    })

    ctx.req.on('end', () => {
        resolve(reqBody)
    })
})

const app = new Koa();

app.use(async (ctx, next) => {
    // console.log('Hello service...')
    let reqBody = await reciveData(ctx)
    let resBody = ''

    let reqData = parseBody(ctx, reqBody)
    // console.log(reqData)
    const username = reqData.username
    const password = reqData.password

    const sql = `SELECT Loginname FROM t_member where Loginname = "${username}" and LoginPwd = "${password}"`; //修改这里的sql

    // console.log(sql)
    let result = await sqlQuery(sql)
    // console.log('cc')
    // console.log(result)
    if(!result) {
        result = []
    }

    resBody = JSON.stringify(result, null, 2)
    console.log(resBody)
    setResHeader(ctx)
    ctx.status = 200
    ctx.body = resBody
})


app.listen(3034, () => {
    console.log('listening at port 3034')
}).on('error', (e) => {
    console.log(e)
})

