// mic.d.ts
declare module 'mic' {
  interface MicOptions {
    endian?: string;
    bitwidth?: string;
    encoding?: string;
    rate?: string;
    channels?: string;
    device?: string;
    exitOnSilence?: number;
    fileType?: string;
    debug?: boolean;
  }

  interface Mic {
    start: () => void;
    stop: () => void;
    pause: () => void;
    resume: () => void;
    getAudioStream: () => any; // Replace 'any' with the actual type of the audio stream
  }

  function mic(options?: MicOptions): Mic;

  export = mic;
}
