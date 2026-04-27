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
console.log('done.')
