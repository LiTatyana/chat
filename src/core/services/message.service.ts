import { MessageModel } from '@schemas/message.schema';
import { createMessageType } from '../validators/message.create.validator';
import { updateMessageType } from '../validators/message.update.validator';

export class messageService {
	public async get(id: string) {
		const message = await MessageModel.findById(id);

		if (!message) {
			throw new Error('User not found');
		}

		return message;
	}

	public async create(data: createMessageType) {
		return await MessageModel.create(data);
	}

	public async update(id: string, data: updateMessageType) {
		await this.get(id);
		return MessageModel.findOneAndUpdate({ _id: id }, data);
	}

	public async delete(id: string) {
		return MessageModel.findByIdAndDelete(id);
	}
}
