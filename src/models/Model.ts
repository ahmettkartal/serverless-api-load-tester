import mongoose from 'mongoose';
type Schema = mongoose.Schema

class Model {
    model: any

    constructor( name: string, schema: Schema ) {
        this.model = mongoose.model(name, schema)
    }

    create (item: object) {
        return new this.model(item).save();
    }

    get (id: string) {
        return this.model.findById(id);
    }

    update (id: string, item: object) {
        return this.model.findByIdAndUpdate(id, item, {runValidators: true});
    }

    delete (id: string) {
        return this.model.findByIdAndDelete(id);
    }

    count () {
        return this.model.countDocuments({});
    }

    countFiltered (filter: object) {
        return this.model.countDocuments(filter);
    }

    list (page: number, per_page: number, list_all: boolean) {
        if (list_all) {
            return this.model.find({}).sort({created_at: -1});
        } else {
            return this.model.find({}).skip((page - 1) * per_page).limit(per_page).sort({created_at: -1});
        }
    }

    aggregate (pipeline: Array<any>) {
        return this.model.aggregate(pipeline);
    }
}

export default Model;