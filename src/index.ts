import { IncomingMessage } from 'http'
import { TLSSocket } from 'tls'

export default function isHTTPS(req: IncomingMessage, trustProxy: Boolean = true): Boolean | undefined {
    // Check x-forwarded-proto header
    const _xForwardedProto = (trustProxy && req.headers) ? req.headers['x-forwarded-proto'] : undefined
    const protoCheck = typeof _xForwardedProto === 'string' ? _xForwardedProto.includes('https') : undefined
    if (protoCheck) {
        return true
    }

    // Check tlsSocket
    const _encrypted = req.connection ? (req.connection as TLSSocket).encrypted : undefined
    const encryptedCheck = _encrypted !== undefined ? _encrypted === true : undefined
    if (encryptedCheck) {
        return true
    }

    if (protoCheck === undefined && encryptedCheck === undefined) {
        return undefined
    }

    return false
}

