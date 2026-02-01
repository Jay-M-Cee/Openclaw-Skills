const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');

const execAsync = util.promisify(exec);

class VoiceSkill {
  constructor() {
    this.name = 'voice';
    this.description = 'Text-to-speech functionality using edge-tts';
    this.dependencies = ['edge-tts'];
  }

  /**
   * Converts text to speech using edge-tts
   * @param {string} text - The text to convert to speech
   * @param {Object} options - Options for the TTS
   * @returns {Promise<string>} Path to the generated audio file
   */
  async textToSpeech(text, options = {}) {
    // Set default options
    const {
      voice = 'en-US-Standard-C',
      output = null,
      rate = '+0%',
      volume = '+0%',
      pitch = '+0Hz'
    } = options;

    // Validate input
    if (!text || typeof text !== 'string') {
      throw new Error('Text is required and must be a string');
    }

    // Create a temporary file for the output
    const tempDir = path.join(__dirname, '..', '..', 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const outputFileName = output || path.join(tempDir, `tts_${Date.now()}.mp3`);
    
    // Build the edge-tts command
    const cmd = [
      'edge-tts',
      '--text', `"${text.replace(/"/g, '\\"')}"`,
      '--write-media', outputFileName,
      '--voice', voice,
      '--rate', rate,
      '--volume', volume,
      '--pitch', pitch
    ].join(' ');

    try {
      // Execute the edge-tts command
      await execAsync(cmd);
      
      // Verify the file was created
      if (!fs.existsSync(outputFileName)) {
        throw new Error(`Failed to create audio file at ${outputFileName}`);
      }

      return outputFileName;
    } catch (error) {
      throw new Error(`Text-to-speech failed: ${error.message}`);
    }
  }

  /**
   * Cleans up temporary audio files older than specified time
   * @param {number} hoursOld - Files older than this many hours will be cleaned up
   * @returns {Promise<number>} Number of files removed
   */
  async cleanupTempFiles(hoursOld = 24) {
    const tempDir = path.join(__dirname, '..', '..', 'temp');
    if (!fs.existsSync(tempDir)) {
      return 0;
    }

    const cutoffTime = Date.now() - (hoursOld * 60 * 60 * 1000);
    const files = fs.readdirSync(tempDir);
    let removedCount = 0;

    for (const file of files) {
      const filePath = path.join(tempDir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isFile() && file.match(/\.(mp3|wav|ogg)$/) && stat.mtime.getTime() < cutoffTime) {
        try {
          fs.unlinkSync(filePath);
          removedCount++;
        } catch (err) {
          console.warn(`Could not remove file ${filePath}: ${err.message}`);
        }
      }
    }

    return removedCount;
  }

  /**
   * Installs the required dependencies
   * @returns {Promise<void>}
   */
  async installDependencies() {
    try {
      await execAsync('pip3 install edge-tts');
      console.log('Successfully installed edge-tts');
    } catch (error) {
      console.error('Failed to install edge-tts:', error.message);
      throw error;
    }
  }

  /**
   * Generates a media link for the audio file
   * @param {string} filePath - Path to the audio file
   * @returns {string} Media link string
   */
  generateMediaLink(filePath) {
    return `MEDIA: ${filePath}`;
  }

  /**
   * Main execution function for the skill
   * @param {Object} params - Parameters for the skill
   * @returns {Promise<Object>} Result of the operation
   */
  async execute(params) {
    const { action, text, options } = params;

    switch (action) {
      case 'tts':
        if (!text) {
          throw new Error('Text is required for text-to-speech');
        }
        
        const filePath = await this.textToSpeech(text, options);
        const mediaLink = this.generateMediaLink(filePath);
        
        // Schedule cleanup of the temp file after some time
        setTimeout(() => {
          if (fs.existsSync(filePath)) {
            fs.unlink(filePath, (err) => {
              if (err) console.error(`Error removing temp file: ${err.message}`);
            });
          }
        }, 300000); // Clean up after 5 minutes
        
        return {
          success: true,
          message: 'Text-to-speech completed successfully',
          media: mediaLink,
          filePath: filePath
        };

      case 'cleanup':
        const hoursOld = options?.hoursOld || 24;
        const cleaned = await this.cleanupTempFiles(hoursOld);
        return {
          success: true,
          message: `Cleaned up ${cleaned} temporary audio files`
        };

      case 'install':
        await this.installDependencies();
        return {
          success: true,
          message: 'Dependencies installed successfully'
        };

      default:
        throw new Error(`Unknown action: ${action}. Available actions: tts, cleanup, install`);
    }
  }
}

module.exports = VoiceSkill;