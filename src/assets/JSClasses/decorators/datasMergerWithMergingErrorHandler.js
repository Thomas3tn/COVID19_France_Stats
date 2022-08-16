export default function mergingErrorHandler({DatasMerger}) {

    DatasMerger.mergingErrorHandler = callback => {

        try {
            return callback;
        } catch (error) {
            console.warn(error);
        }

    }

    return DatasMerger;

}