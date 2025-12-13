/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/images/photos');
const outputDir = inputDir; // Same directory

// WebP conversion settings
const webpOptions = {
    quality: 85, // High quality (80-90 is recommended)
    effort: 6,   // Compression effort (0-6, higher = better compression)
};

async function convertImagesToWebP() {
    try {
        const files = fs.readdirSync(inputDir);
        const jpegFiles = files.filter(file =>
            file.toLowerCase().endsWith('.jpeg') || file.toLowerCase().endsWith('.jpg')
        );

        console.log(`\n🖼️  Found ${jpegFiles.length} JPEG images to convert\n`);

        for (const file of jpegFiles) {
            const inputPath = path.join(inputDir, file);
            const outputFileName = file.replace(/\.(jpeg|jpg)$/i, '.webp');
            const outputPath = path.join(outputDir, outputFileName);

            try {
                const inputStats = fs.statSync(inputPath);
                const inputSizeKB = (inputStats.size / 1024).toFixed(1);

                await sharp(inputPath)
                    .webp(webpOptions)
                    .toFile(outputPath);

                const outputStats = fs.statSync(outputPath);
                const outputSizeKB = (outputStats.size / 1024).toFixed(1);
                const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

                console.log(`✅ ${file}`);
                console.log(`   ${inputSizeKB} KB → ${outputSizeKB} KB (${reduction}% reduction)\n`);
            } catch (error) {
                console.error(`❌ Error converting ${file}:`, error.message);
            }
        }

        console.log('✨ Conversion complete!\n');
    } catch (error) {
        console.error('❌ Error reading directory:', error.message);
        process.exit(1);
    }
}

convertImagesToWebP();
