import sharp from "sharp";
import { readdir, readFile, writeFile, stat } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

// === 설정 ===
const TARGET_DIRS = [
    "src/assets",
    "src/assets/projects",
    "src/assets/works",
    "src/assets/icons",
];
const EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];
const WEBP_QUALITY = 78;
const MANIFEST_PATH = ".image-optimize-manifest.json";
// ============

async function getFileHash(filePath) {
    // 파일 크기 + 수정시간으로 변경 감지
    const info = await stat(filePath);
    return `${info.size}-${info.mtimeMs}`;
}

async function loadManifest() {
    if (!existsSync(MANIFEST_PATH)) return {};
    const raw = await readFile(MANIFEST_PATH, "utf8");
    return JSON.parse(raw);
}

async function saveManifest(manifest) {
    await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
}

async function processDir(dirPath, manifest) {
    if (!existsSync(dirPath)) return;
    const files = await readdir(dirPath);
    let count = 0;

    for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (!EXTENSIONS.includes(ext)) continue;

        const filePath = path.join(dirPath, file);
        const hash = await getFileHash(filePath);

        // 이미 처리된 파일이면 스킵
        if (manifest[filePath] === hash) continue;

        const inputInfo = await stat(filePath);
        const inputSize = inputInfo.size;

        // readFile로 먼저 버퍼에 읽어 파일 핸들 완전 해제 후, 버퍼로 sharp 처리 (Windows 락 방지)
        const outputPath = filePath.replace(/\.(jpg|jpeg|png|webp)$/i, ".webp");
        const inputBuffer = await readFile(filePath);
        const outputBuffer = await sharp(inputBuffer)
            .webp({ quality: WEBP_QUALITY })
            .toBuffer();
        const outputSize = outputBuffer.length;

        // 압축 결과가 원본보다 작을 때만 교체
        if (outputSize < inputSize) {
            await writeFile(outputPath, outputBuffer);
            const saved = ((1 - outputSize / inputSize) * 100).toFixed(1);
            console.log(`✓ ${file} → ${outputSize}B (${saved}% 감소)`);
            count++;
        } else {
            console.log(`- ${file} 스킵 (이미 최적화됨)`);
        }

        // writeFile 이후 실제 파일 상태(크기+mtime)로 저장 → 다음 실행 시 정확히 스킵
        manifest[filePath] = await getFileHash(filePath);
    }

    return count;
}

async function main() {
    console.log("이미지 최적화 시작...\n");
    const manifest = await loadManifest();
    let total = 0;

    for (const dir of TARGET_DIRS) {
        const count = await processDir(dir, manifest);
        total += count ?? 0;
    }

    await saveManifest(manifest);
    console.log(`\n완료: ${total}개 파일 최적화됨`);
}

main().catch(console.error);