import {setupWorker, rest} from 'msw'

const worker = setupWorker(rest.get(`${process.env.REACT_APP_API}/api/v1/user`, (req,res,ctx)=> {
  return res(
    ctx.status(200),
    ctx.json({
      name:'Marco'
    })
  )
}))

export {worker}