# Voice Skill

The Voice skill provides text-to-speech functionality using edge-tts, allowing you to convert text to spoken audio.

## Features

- Text-to-speech conversion using Microsoft Edge's TTS engine
- Support for various voice options and audio settings
- Automatic cleanup of temporary audio files
- Integration with the MEDIA system for audio playback

## Installation

Before using this skill, you need to install the required dependency:

```bash
pip3 install edge-tts
```

Or use the skill's install action:

```javascript
await skill.execute({ action: 'install' });
```

## Usage

### Text-to-Speech

Convert text to speech with default settings:

```javascript
const result = await skill.execute({
  action: 'tts',
  text: 'Hello, how are you today?'
});
// Returns a MEDIA link to the audio file
```

With custom options:

```javascript
const result = await skill.execute({
  action: 'tts',
  text: 'This is a sample of voice customization.',
  options: {
    voice: 'en-US-Standard-D',
    rate: '+10%',
    volume: '-5%',
    pitch: '+10Hz'
  }
});
```

### Cleanup Temporary Files

Clean up temporary audio files older than 24 hours:

```javascript
const result = await skill.execute({
  action: 'cleanup'
});
```

Or specify a custom age threshold:

```javascript
const result = await skill.execute({
  action: 'cleanup',
  options: {
    hoursOld: 12  // Clean files older than 12 hours
  }
});
```

## Options

The following options are available for text-to-speech:

- `voice`: The voice to use (default: 'en-US-Standard-C')
- `rate`: Speech rate adjustment (default: '+0%')
- `volume`: Volume adjustment (default: '+0%')
- `pitch`: Pitch adjustment (default: '+0Hz')

## Supported Voices

Edge-TTS supports many voices in different languages. Some examples:
- English (US): en-US-Standard-C, en-US-Standard-D, en-US-Wavenet-F
- English (UK): en-GB-Standard-A, en-GB-Wavenet-A
- Spanish: es-ES-Standard-A, es-MX-Standard-A
- French: fr-FR-Standard-A, fr-FR-Wavenet-A
- German: de-DE-Standard-A, de-DE-Wavenet-A
- And many more...

## File Management

- Audio files are temporarily stored in the `temp` directory
- Files are automatically cleaned up after 5 minutes of creation
- A periodic cleanup removes any remaining old temporary files

## Requirements

- Python 3.x
- pip package manager
- edge-tts library (install via `pip3 install edge-tts`)