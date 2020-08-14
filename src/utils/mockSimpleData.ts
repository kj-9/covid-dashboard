import { SimpleDataType } from '../components/simpleData';

export default function mockSimpleData(length:number): SimpleDataType[] {
    let out: SimpleDataType[] = [];

    for (let i = 1; i <= length; i++) {
        out.push(
            {
                x: Math.random().toString(36).substring(7),
                y: Math.random() * 1000
            }
        )
    }
    return out;
}