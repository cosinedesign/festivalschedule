
// Utility Types

export interface ISearchable {
    tags: Array<string>,
    keywords: Array<string>
}

export interface IDescribable extends ISearchable {
    name: string,
    description: string | null
}

export type DateTimeSpan = {
    start: Date,
    end: Date,
    duration?(): BigInt
}

export interface Location {
    name: string
}

export type RealWorldEvent = {
    when: DateTimeSpan,
    where?: Location
}

export type Person = {
    name: string
}

export type People = Array<Person>;

