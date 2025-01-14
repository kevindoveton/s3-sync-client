const { AbortController } = require('@aws-sdk/abort-controller');
const { DEFAULT_MAX_CONCURRENT_TRANSFERS } = require('../constants');

class TransferManager {
    constructor(options = {}) {
        const {
            client,
            commandInput,
            maxConcurrentTransfers = DEFAULT_MAX_CONCURRENT_TRANSFERS,
            monitor,
            objects,
        } = options;
        this.client = client;
        this.commandInput = commandInput;
        this.maxConcurrentTransfers = maxConcurrentTransfers;
        this.objects = objects;
        this.abortController = new AbortController();
        this.monitor = monitor;
        if (this.monitor) {
            const totalDataSize = this.objects.reduce((total, { size }) => total + size, 0);
            this.monitor.emit('metadata', totalDataSize, this.objects.length);
            this.monitor.on('abort', this.abort.bind(this));
        }
    }

    abort() {
        this.abortController.abort();
    }
}

module.exports = TransferManager;
