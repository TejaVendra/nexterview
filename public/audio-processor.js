class PCMProcessor extends AudioWorkletProcessor {
    constructor() {
        super();

        this.inputSampleRate = sampleRate;
        this.targetSampleRate = 16000;

        this.resampleRatio =
            this.inputSampleRate / this.targetSampleRate;

        this.previousSample = 0;
        this.sampleBuffer = [];
        this.outputBuffer = [];

        // 100 ms at 16 kHz = 1600 samples.
        this.targetChunkSamples = 1600;
    }

    process(inputs) {
        const input = inputs[0];

        if (!input || !input[0]) {
            return true;
        }

        const inputData = input[0];

        if (this.inputSampleRate === this.targetSampleRate) {
            for (let i = 0; i < inputData.length; i++) {
                this.outputBuffer.push(inputData[i]);
            }
        } else {
            // Linear interpolation resampler.
            // This is intentionally simple and appropriate for speech STT.
            this.sampleBuffer.push(...inputData);

            let position = 0;

            while (
                position + 1 < this.sampleBuffer.length
            ) {
                const index = Math.floor(position);
                const fraction = position - index;

                const sampleA = this.sampleBuffer[index];
                const sampleB = this.sampleBuffer[index + 1];

                const sample =
                    sampleA +
                    (sampleB - sampleA) * fraction;

                this.outputBuffer.push(sample);

                position += this.resampleRatio;
            }

            const consumed = Math.floor(position);

            if (consumed > 0) {
                this.sampleBuffer =
                    this.sampleBuffer.slice(consumed);

                position -= consumed;
            }
        }

        while (
            this.outputBuffer.length >=
            this.targetChunkSamples
        ) {
            const samples =
                this.outputBuffer.splice(
                    0,
                    this.targetChunkSamples
                );

            const pcm16 =
                new Int16Array(samples.length);

            for (let i = 0; i < samples.length; i++) {
                const sample = Math.max(
                    -1,
                    Math.min(1, samples[i])
                );

                pcm16[i] =
                    sample < 0
                        ? sample * 0x8000
                        : sample * 0x7fff;
            }

            this.port.postMessage(
                pcm16.buffer,
                [pcm16.buffer]
            );
        }

        return true;
    }
}

registerProcessor("pcm-processor", PCMProcessor);
