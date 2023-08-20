declare module 'vosk' {
  /**
   * WordResult represents the result of a single word recognition.
   * It includes the confidence score, start and end time of the word in the audio stream, and the recognized word itself.
   */
  export type WordResult = {
    conf: number;
    start: number;
    end: number;
    word: string;
  };

  /**
   * RecognitionResults represents the results of a speech recognition process.
   * It includes an array of WordResult and the complete sentence that has been detected.
   */
  export type RecognitionResults = {
    result: WordResult[];
    text: string;
  };

  /**
   * SpeakerResults represents the results of a speaker recognition process.
   * It includes a floating vector representing speaker identity and the number of frames used to extract speaker vector.
   */
  export type SpeakerResults = {
    spk: number[];
    spk_frames: number;
  };

  /**
   * BaseRecognizerParam represents the base parameters for a recognizer.
   * It includes the language model to be used and the sample rate.
   */
  export type BaseRecognizerParam = {
    model: Model;
    sampleRate: number;
  };

  /**
   * GrammarRecognizerParam represents the parameters for a grammar recognizer.
   * It includes the list of sentences to be recognized.
   */
  export type GrammarRecognizerParam = {
    grammar: string[];
  };

  /**
   * SpeakerRecognizerParam represents the parameters for a speaker recognizer.
   * It includes the SpeakerModel that will enable speaker identification.
   */
  export type SpeakerRecognizerParam = {
    speakerModel: SpeakerModel;
  };

  /**
   * Result represents the result of a recognition process.
   * It can be either SpeakerResults & RecognitionResults for a SpeakerRecognizerParam or RecognitionResults for a GrammarRecognizerParam.
   */
  export type Result<
    T extends SpeakerRecognizerParam | GrammarRecognizerParam
  > = T extends SpeakerRecognizerParam
    ? SpeakerResults & RecognitionResults
    : RecognitionResults;

  /**
   * PartialResults represents the partial results of a recognition process.
   * It includes the partial sentence that has been detected until now.
   */
  export type PartialResults = {
    partial: string;
  };

  /**
   * Grammar represents the list of strings to be recognized.
   */
  export type Grammar = string[];

  /**
   * setLogLevel is a function to set the log level for Kaldi messages.
   */
  export function setLogLevel(level: number): void;

  /**
   * Model is a class to build a Model from a model file.
   */
  export class Model {
    constructor(modelPath: string);
    handle: unknown;
    free(): void;
  }

  /**
   * SpeakerModel is a class to build a Speaker Model from a speaker model file.
   * The Speaker Model enables speaker identification.
   */
  export class SpeakerModel {
    constructor(modelPath: string);
    handle: unknown;
    free(): void;
  }

  /**
   * Recognizer is a class to create a Recognizer that will be able to transform audio streams into text using a Model.
   */
  export class Recognizer<
    T extends XOR<SpeakerRecognizerParam, Partial<GrammarRecognizerParam>>
  > {
    constructor(param: T & BaseRecognizerParam);
    handle: unknown;
    free(): void;
    setMaxAlternatives(max_alternatives: number): void;
    setWords(words: boolean): void;
    setPartialWords(partial_words: boolean): void;
    setSpkModel(spk_model: SpeakerModel): void;
    acceptWaveform(data: Buffer): boolean;
    acceptWaveformAsync(data: Buffer): Promise<boolean>;
    resultString(): string;
    result(): Result<T>;
    partialResult(): PartialResults;
    finalResult(): Result<T>;
    reset(): void;
  }
}
