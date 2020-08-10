export type SimpleDataType = {
    x: string;
    y: number;
}
export type SimpleKeyType = 'y';

export const SimpleKey = ['y'] as SimpleKeyType[];

export const getX = (d: SimpleDataType) => d.x;
