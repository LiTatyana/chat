import { RedisClientType, createClient } from 'redis';

const redis = createClient();
redis.connect().catch(console.error);

export class CacheService {
	private client: RedisClientType;
	constructor() {
		this.client = createClient();
		this.client.connect().catch((e) => {
			throw new Error('Redis connection error');
		});
	}

	public async get<T>(key: string): Promise<T | null> {
		const data = await this.client.get(key);
		if (!data) return null;

		try {
			return JSON.parse(data) as T;
		} catch {
			return data as unknown as T;
		}
	}
	public async set(key: string, value: unknown, ttl: number | string = 900_000): Promise<void> {
		const ttlNumber = typeof ttl === 'string' ? Number.parseInt(ttl, 10) : ttl;
		const stringValue = JSON.stringify(value);
		await this.client.set(key, stringValue, { PX: ttlNumber });
	}

	public async delete(key: string) {
		await this.client.del(key);
	}
}

export const cacheService = new CacheService();
