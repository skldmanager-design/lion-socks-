import sharp from 'sharp'
import { readdir, stat, copyFile, mkdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const HOME_DIR = join(__dirname, '..', 'public', 'home')
const BACKUP_DIR = join(__dirname, '..', 'public', 'home', '_originals')

async function ensureBackup() {
  try {
    await mkdir(BACKUP_DIR, { recursive: true })
  } catch {}
}

async function compress(file) {
  const src = join(HOME_DIR, file)
  const backup = join(BACKUP_DIR, file)
  const beforeBytes = (await stat(src)).size

  // Backup original (only if not yet backed up)
  try {
    await stat(backup)
  } catch {
    await copyFile(src, backup)
  }

  // Read backup, compress to a buffer, write to original path.
  const buf = await sharp(backup)
    .resize({ width: 1920, withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true, progressive: true })
    .toBuffer()

  // Use sharp to write to disk safely (avoids same-file read/write conflicts).
  await sharp(buf).toFile(src)

  const afterBytes = (await stat(src)).size
  const ratio = ((1 - afterBytes / beforeBytes) * 100).toFixed(1)
  console.log(
    `${file}: ${(beforeBytes / 1024 / 1024).toFixed(1)} MB → ${(afterBytes / 1024).toFixed(0)} KB (-${ratio}%)`,
  )
}

await ensureBackup()
const files = (await readdir(HOME_DIR)).filter((f) => /\.(jpe?g|png)$/i.test(f))
for (const f of files) await compress(f)

/* Outras pastas com assets pesados ─────────────────────────────────────── */

async function compressAt(absPath, { maxWidth = 1920, quality = 78 } = {}) {
  const before = (await stat(absPath)).size
  const buf = await sharp(absPath)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .png({ quality, compressionLevel: 9, palette: true })
    .toBuffer()
  await sharp(buf).toFile(absPath)
  const after = (await stat(absPath)).size
  const ratio = ((1 - after / before) * 100).toFixed(1)
  console.log(
    `${absPath.split(/[\\/]/).slice(-3).join('/')}: ${(before / 1024 / 1024).toFixed(1)} MB → ${(after / 1024).toFixed(0)} KB (-${ratio}%)`,
  )
}

const ROOT = join(__dirname, '..')

// Material icons (PNG genérico, ~1-2 MB cada → max 200KB)
for (const f of ['algodao.png', 'ovelha.png', 'seda.png']) {
  await compressAt(join(ROOT, 'public', 'icons', 'materiais', f), { maxWidth: 400, quality: 75 })
}

// Pack editorial usado em /packs (22 MB → max 500KB)
await compressAt(
  join(ROOT, 'public', 'lion_socks_brand_kit', '08_site', 'pack_editorial_desktop.png'),
  { maxWidth: 1200, quality: 80 },
)

console.log('done.')
