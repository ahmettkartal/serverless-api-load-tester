import Model from './Model';
import LoadTestSchema from "../schemas/LoadTestSchema";

class LoadTest extends Model {
    constructor() {
        super("LoadTest", LoadTestSchema);
    }
    listPaginated(page: number, per_page: number, list_all: boolean) {
        let aggregatePipeline: Array<any> = [

            {
                $sort: { created_at: -1 }
            }
        ];

        if (!list_all) {
            aggregatePipeline.push(
                {
                    $skip: (page - 1) * per_page
                },
                {
                    $limit: per_page
                }
            );
        }

        return this.aggregate(aggregatePipeline);
    }

}

export default new LoadTest()