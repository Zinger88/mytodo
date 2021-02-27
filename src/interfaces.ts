export interface AppProps {
    user: any,
    firestore: any
    auth: any
}
export interface ItemProps {
    date: Date,
    key: string,
    id: string,
    text: string,
    isDone: boolean,
    removeItem(id: string): void,
    setText(id: string, text: string): void,
    setDate(id: string, date: Date): void,
    setDoneStatus(id: string, isDone: boolean): void
}

export interface AuthProps {
    firestore: any,
    auth: any,
}
