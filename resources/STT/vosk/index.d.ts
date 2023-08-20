export declare module 'vosk' {
  export class Model {
    constructor(modelPath: string);
    free(): void;
  }

  export class SpeakerModel {
    constructor(modelPath: string);
    free(): void;
  }

  export class Recognizer {
    constructor(param: any);
    free(): void;
    setMaxAlternatives(max_alternatives: number): void;
    setWords(words: boolean): void;
    setPartialWords(partial_words: boolean): void;
    setSpkModel(spk_model: SpeakerModel): void;
    acceptWaveform(data: Buffer): boolean;
    acceptWaveformAsync(data: Buffer): Promise<boolean>;
    resultString(): string;
    result(): any;
    partialResult(): any;
    finalResult(): any;
    reset(): void;
  }

  export function setLogLevel(level: number): void;
}
export class KaldiRecognizer extends Recognizer {
  constructor(model: Model, sampleRate: number);
}
