// Event Models

import { IDescribable, Location, Person, RealWorldEvent } from "./models.common"

export type Performer = Person & IDescribable & {
    id: string | number | null,
    // a performer may play as multiple different names within a festival
    aliases: Array<string>,
    // genres or types of performance
    genres?: Array<string>    
} 

export type Stage = Location & {
    id: string | number | null,
    events: Set<Performance>,    
    lineups: Map<number, Array<RealWorldEvent>>,
    days: Set<Date>
}

export type Performance = RealWorldEvent & IDescribable & {
    id: string | number | null,
    who: Performer | Array<Performer>
}

/*
export type Musician = Performer & {
    affiliation: Array<string>
} */
