import vosk from 'vosk';
import fs from 'fs';
import mic from 'mic';

const MODEL_PATH: string = './resources/STT/models/model-here';
const SAMPLE_RATE: number = 16000;

if (!fs.existsSync(MODEL_PATH)) {
  console.log(
    'Please download the model from https://alphacephei.com/vosk/models and unpack as ' +
      MODEL_PATH +
      ' in the current folder.'
  );
  process.exit();
}

vosk.setLogLevel(0);
const model = new vosk.Model(MODEL_PATH);
const rec = new vosk.Recognizer({ model: model, sampleRate: SAMPLE_RATE });

const micInstance = mic({
  rate: String(SAMPLE_RATE),
  channels: '1',
  debug: false,
  device: 'default',
});

const micInputStream = micInstance.getAudioStream();

micInputStream.on('data', (data: any) => {
  if (rec.acceptWaveform(data)) console.log(rec.result());
  //else console.log(rec.partialResult());
});

micInputStream.on('audioProcessExitComplete', () => {
  console.log('Cleaning up');
  console.log(rec.finalResult());
  rec.free();
  model.free();
});

process.on('SIGINT', () => {
  console.log('\nStopping');
  micInstance.stop();
  process.exit(0);
});

micInstance.start();
