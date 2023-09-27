import type { IncomingMessage } from "node:http";
import type { TLSSocket } from "node:tls";

export function isHTTPS(
  req: IncomingMessage,
  trustProxy = true,
): boolean | undefined {
  // Check x-forwarded-proto header
  const _xForwardedProto =
    trustProxy && req.headers ? req.headers["x-forwarded-proto"] : undefined;
  const protoCheck =
    typeof _xForwardedProto === "string"
      ? _xForwardedProto.includes("https")
      : undefined;
  if (protoCheck) {
    return true;
  }

  // Check tlsSocket
  const _encrypted = req.connection
    ? (req.connection as TLSSocket).encrypted
    : undefined;
  const encryptedCheck =
    _encrypted === undefined ? undefined : _encrypted === true;
  if (encryptedCheck) {
    return true;
  }

  if (protoCheck === undefined && encryptedCheck === undefined) {
    return undefined;
  }

  return false;
}
