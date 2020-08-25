export default function toPlainObject(objectArray: object[]): object[] {
    return objectArray.map(element => Object.assign({}, element))
}
