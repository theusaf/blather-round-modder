export function redirect(req: Request, path: string, code = 302) {
  const url = new URL(req.url);
  return Response.redirect(`${url.protocol}${url.host}${path}`, code);
}
