import fs from 'node:fs'
import path from 'node:path'
import * as cheerio from 'cheerio'

const rootDir = process.cwd()
const publicDir = path.join(rootDir, 'public')
const profilePath = path.join(publicDir, 'profile.json')
const profileData = JSON.parse(fs.readFileSync(profilePath, 'utf8'))

const pageTitles = {
  'index.html': 'Sourabh Chouhan — Frontend Developer',
  'about.html': 'About — Sourabh Chouhan - Frontend Developer',
  'contact.html': 'Contact — Sourabh Chouhan - Frontend Developer',
  'work.html': 'Work — Sourabh Chouhan - Frontend Developer',
  'work--atlas-finance.html': 'Sprout — Sourabh Chouhan - Frontend Developer',
  'work--brightly-studio.html': 'Moji — Sourabh Chouhan - Frontend Developer',
  'work--luma-workspace.html': 'AI Films — Sourabh Chouhan - Frontend Developer',
  'work--nova-health.html': 'Banana Shake — Sourabh Chouhan - Frontend Developer',
}

const htmlFiles = Object.keys(pageTitles)

function walkAndReplaceText($, node, from, to) {
  node.contents().each((_, child) => {
    if (child.type === 'text') {
      if (child.data && child.data.includes(from)) {
        child.data = child.data.replaceAll(from, to)
      }
    } else if (child.type === 'tag' && child.name !== 'script' && child.name !== 'style') {
      walkAndReplaceText($, $(child), from, to)
    }
  })
}

for (const file of htmlFiles) {
  const filePath = path.join(publicDir, file)
  if (!fs.existsSync(filePath)) continue

  const originalHtml = fs.readFileSync(filePath, 'utf8')
  const $ = cheerio.load(originalHtml, { decodeEntities: false })

  // 1. Text bindings
  for (const binding of profileData.textBindings) {
    walkAndReplaceText($, $('body'), binding.from, binding.to)
    if ($('title').text().includes(binding.from)) {
      $('title').text($('title').text().replaceAll(binding.from, binding.to))
    }
    $('meta[name="description"], meta[property="og:title"], meta[property="og:description"], meta[name="twitter:title"], meta[name="twitter:description"]').each((_, el) => {
      const content = $(el).attr('content')
      if (content && content.includes(binding.from)) {
        $(el).attr('content', content.replaceAll(binding.from, binding.to))
      }
    })
  }

  // 2. Link bindings
  for (const binding of profileData.linkBindings) {
    try {
      $(binding.selector).each((_, el) => {
        const link = $(el)
        if (binding.matchText && link.text().trim() !== binding.matchText) return
        link.attr('href', binding.href)
        if (binding.text) link.text(binding.text)
      })
    } catch (err) {
      console.warn(`Selector error on ${file}: ${binding.selector}`, err.message)
    }
  }

  // 3. Image bindings
  for (const binding of profileData.imageBindings) {
    try {
      $(binding.selector).each((_, el) => {
        const img = $(el)
        img.attr('src', binding.src)
        img.removeAttr('srcset')
        img.removeAttr('sizes')
        if (binding.alt) img.attr('alt', binding.alt)
      })
    } catch (err) {
      console.warn(`Selector error on ${file}: ${binding.selector}`, err.message)
    }
  }

  // 4. Update title and meta title tags
  const title = pageTitles[file]
  if (title) {
    $('title').text(title)
    $('meta[property="og:title"]').attr('content', title)
    $('meta[name="twitter:title"]').attr('content', title)
  }

  // General cleanups for any leftover template headers
  $('meta[name="description"], meta[property="og:description"], meta[name="twitter:description"]').each((_, el) => {
    const content = $(el).attr('content')
    if (content && (content.includes('Nadina') || content.includes('portfolio template with a calm aesthetic'))) {
      $(el).attr('content', 'Sourabh Chouhan - Frontend Developer portfolio showcasing responsive web apps, landing pages, and AI projects.')
    }
  })

  fs.writeFileSync(filePath, $.html(), 'utf8')
  console.log(`Updated ${file}`)
}

console.log('All HTML files successfully updated!')
