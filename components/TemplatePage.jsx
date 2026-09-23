import fs from 'node:fs'
import path from 'node:path'

function readTemplate(file) {
  const source = fs.readFileSync(path.join(process.cwd(), 'public', file), 'utf8')
  const styles = (source.match(/<style[\s\S]*?<\/style>/gi) || []).join('\n')
  const bodyMatch = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
  const body = bodyMatch ? bodyMatch[1] : source
  return `${styles}\n${body}`
}

export default function TemplatePage({ file }) {
  return (
    <>
      <div className="template-page" dangerouslySetInnerHTML={{ __html: readTemplate(file) }} />
      <script src="/profile.js" defer />
    </>
  )
}
