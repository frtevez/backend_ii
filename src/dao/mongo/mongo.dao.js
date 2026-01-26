class MongoDAO {
    constructor(model) {
        this.model = model;
    }

    getAll = async () => {
        try {
            return await this.model.find()
        } catch (error) {
            throw new Error(error);
        }
    };
    getById = async (id) => {
        try {
            return await this.model.findById(id)
        } catch (error) {
            throw new Error(error);
        }
    };
    getByKey = async (key, value) => {
        try {
            return await this.model.findOne({ [key]: value })
        } catch (error) {
            throw new Error(error);
        }
    };
    create = async (data) => {
        try {
            return await this.model.create(data)
        } catch (error) {
            throw new Error(error);
        }
    };
    updateById = async (id, data) => {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true, runValidators: true })
        } catch (error) {
            throw new Error(error);
        }
    };
    deleteById = async (id) => {
        try {
            return await this.model.findByIdAndDelete(id)
        } catch (error) {
            throw new Error(error);
        }
    };
};

export default MongoDAO;