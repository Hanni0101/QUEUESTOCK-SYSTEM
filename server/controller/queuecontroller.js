const Queue = require('../model/queuemodel');

exports.getAllQueues = async (req, res) => {
    try {
        const queues = await Queue.find();
        res.json(queues);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getQueueById = async (req, res) => {
    try {
        const queue = await Queue.findById(req.params.id);
        if (!queue) return res.status(404).json({ error: 'Queue not found' });
        res.json(queue);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createQueue = async (req, res) => {
    try {
        const newQueue = new Queue(req.body);
        await newQueue.save();
        res.status(201).json(newQueue);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateQueue = async (req, res) => {
    try {
        const updated = await Queue.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteQueue = async (req, res) => {
    try {
        await Queue.findByIdAndDelete(req.params.id);
        res.json({ message: 'Queue deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
