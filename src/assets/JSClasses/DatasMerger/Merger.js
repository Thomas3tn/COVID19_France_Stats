export default class Merger {
    static mergingErrorHandler(callback) {

        try {
            return callback;
        } catch (error) {
            console.warn(error);
        }

    }
}