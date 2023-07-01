import fs from 'fs';
import path from 'path';
import { EJsonEntity } from './enums';

export class JsonModel<T extends { id: number; title: string }> {
    entity: EJsonEntity;

    constructor(entity: EJsonEntity) {
        this.entity = entity;
    }

    /** Загружаем элементы по пагинации */
    public get({ page = 1, limit = 100, search = '' }): T[] {
        let jsonData = this.getJson();

        if (search) {
            jsonData = jsonData.filter(({ title }) => title?.toLowerCase().includes(search.toLowerCase()));
        }

        const start = page === 1 ? 0 : page * limit - 1;
        return jsonData.splice(start, limit);
    }

    /** Загружаем элемент по id */
    public getById(id: number): T {
        const element = this.getJson().find((el) => el.id === id);
        if (!element) {
            throw new Error(`element by id=${id} not found`);
        }
        return element;
    }

    /** Создаем новый элемент */
    public create(element: T): T {
        if (!element) {
            throw new Error(`element create body not found`);
        }

        const item: T = {
            ...element,
            id: Date.now(),
        };

        // тут что-то типа валидации, но нужн будет разделять модели для каждой сущности, но мне лень

        this.setJson([item, ...this.getJson()]);
        return item;
    }

    /** Изменяем элемент id */
    public update(id: number, updateData: Partial<T>): T {
        if (!updateData) {
            throw new Error(`element updateData body not found`);
        }

        const jsonData = this.getJson();
        const index = jsonData.findIndex((el) => el.id === id);
        if (index === -1) {
            throw new Error(`element by id=${id} not found`);
        }

        // тут что-то типа валидации

        jsonData[index] = { ...jsonData[index], ...updateData };
        this.setJson(jsonData);
        return jsonData[index];
    }

    /** Удаляем элемент по id */
    public delete(id: number): void {
        const jsonData = this.getJson().filter((el) => el.id !== id);
        this.setJson(jsonData);
    }

    /** Загружаем JSON */
    private getJson(): T[] {
        const dataPath = path.resolve(__dirname, '../../static/json', `${this.entity}.json`);
        const json = fs.readFileSync(dataPath).toString();

        if (!json) {
            throw new Error(`${this.entity} json not found`);
        }

        return JSON.parse(json);
    }

    /** Записываем JSON */
    private setJson(jsonData: T[]) {
        const dataPath = path.resolve(__dirname, '../../static/json', `${this.entity}.json`);
        fs.writeFileSync(dataPath, JSON.stringify(jsonData, null, 2));
    }
}
