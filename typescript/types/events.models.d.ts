

// Utility Types


export interface ISearchable {
    tags: Array<string>,
    keywords: Array<string>
}

export interface IDescribable extends ISearchable {
    name: string,
    description: string
}

export type DateTimeSpan = {
    start: Date,
    end: Date,
    duration?(): BigInt
}

export type Person = {
    name: string
}

export type People = Array<Person>;

export type Performer = Person & IDescribable & {
    // a performer may play as multiple different names within a festival
    aliases: Array<string>,
    // genres or types of performance
    genres: Array<string>    
} 

export type Musician = Performer & {
    affiliation: Array<string>
} 

// Event Models
export interface Location {
    name: string
}

export type RealWorldEvent = {
    when: DateTimeSpan,
    where?: Location
}

export type Stage = Location & {
    events: Set<MusicEvent>,    
    lineups: Map<number, Array<RealWorldEvent>>,
    days: Set<Date>
}

export type MusicEvent = RealWorldEvent & IDescribable & {
    who: Musician | Array<Musician>
}
