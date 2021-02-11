export interface ItemProps {
    key: string,
    id: string,
    text: string,
    isDone: boolean,
    removeItem(id: string): void,
    setText(id: string, text: string): void,
    setDoneStatus(id: string, isDone: boolean): void
}