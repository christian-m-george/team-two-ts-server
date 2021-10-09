// import { Request, Response } from 'express'
// import jwt, { Secret, SignOptions } from 'jsonwebtoken'
// // import { Base64 } from 'js-base64'
// import { UserPayloadDTO } from '../auth/authPayload'
// import config from '../config'

// const ACCESS_TOKEN_SECRET: Secret = config.token.tokenSecret
// const REFRESH_TOKEN_SECRET: Secret = config.token.refreshSecret

// export const signAccessToken = () => (res: Response, payload: UserPayloadDTO, options: SignOptions): string | any => {
// 	if (!payload) {
// 		return null
// 	} else {
// 		const accessToken: string = jwt.sign({ ...payload }, ACCESS_TOKEN_SECRET, { ...options })
// 		const refreshToken: string = jwt.sign({ ...payload }, REFRESH_TOKEN_SECRET, { expiresIn: '90d' })



//         // Buffer.from(payload, 'base64').toString()
// 		const encodedAccessToken: string = Base64.encode(accessToken)
// 		const encodedRefreshToken: string = Base64.encode(refreshToken)

// 		res.cookie('reftok', `${encodedRefreshToken}`, { maxAge: 86400 * 90, httpOnly: true })

// 		return { accessToken: encodedAccessToken, refreshToken: encodedRefreshToken }
// 	}
// }

// export const verifySignAccessToken = () => (token: string): string | any => {
// 	if (!Base64.isValid(token)) {
// 		return null
// 	} else {
// 		const decodedToken: string = Base64.decode(token)
// 		const decoded: string | any = jwt.verify(decodedToken, ACCESS_TOKEN_SECRET)
// 		return decoded
// 	}
// }

// export const signRefreshToken = () => (req: Request): string | any => {
// 	const getToken: string = req.cookies.reftok

// 	if (!Base64.isValid(getToken) && !getToken) {
// 		return null
// 	} else {
// 		const decodedToken: string = Base64.decode(getToken)

// 		const { user_id, email }: string | any = jwt.verify(decodedToken, REFRESH_TOKEN_SECRET)
// 		const accessToken: string = jwt.sign({ user_id: user_id, email: email }, ACCESS_TOKEN_SECRET, {
// 			expiresIn: '90d'
// 		})

// 		const encodedAccessToken: string = Base64.encode(accessToken)
// 		return encodedAccessToken
// 	}
// }