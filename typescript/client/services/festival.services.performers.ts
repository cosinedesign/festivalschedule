import { IHash } from '../../types/utility';
import { Musician, Performer } from '../../types/events.models';
import { genres } from './festival.services.genres';

function a (name: string, genres?: Array<string>) : Musician {
    return {
        name: name,
        description: null,
        genres: genres,
        aliases: [] as Array<string>,
        tags: [] as Array<string>,
        keywords: [] as Array<string>,
        affiliation: [] as Array<string>
    };
}

const artists : IHash<Performer> = {
    "ama": a("AMA"),
    "acidBrunchClub": a("Acid Brunch Club"),
    "alexxxan": a("AlexXxan", [genres.techno]),
    "andreaMarks": a("Andrea Marks", [genres.techno]),
    "ArcRunner": a("ArcRunner", [genres.goth, genres.industrial]),	
    "captainFuck": a("Captain Fuck"),
    "char": a("char7"),
    "chuck": a("Chuck Chuck"),
    "cosinezero": a("cosinezero", [genres.bass, genres.breaks, genres.dnb, genres.triphop]),
    "cromafor": a("Cromafor"),
    "dabu": a("dabu", [genres.bass, genres.breaks, genres.dnb, genres.triphop]),
    "damianPaul": a("Damian Paul", [genres.techno]),
    "dekichan": a("dekichan", [genres.electroswing]),
    "dessa": a("Nightshade", [genres.dnb]),
    "djSlothrower": a("DJ SlothThrower"),
    "dontnormally": a("dontnormally", [genres.techno, genres.bass]),
    "Drift": a("Drift"),
    "elementalFlux": a("Elemental Flux"),
    "epochalyptic": a("Epochalyptic"),
    "FaitAccompli": a("Fait Accompli"),
    "fig": a("FiG", [genres.dnb, genres.breaks]),
    "fox": a("Fox", [genres.dnb, genres.hiphop]),
    "garyCarlow": a("Gary Carlow", [genres.techno, genres.house]),
    "gav": a("DJ Gav"),
    "JazzCabbage": a("Jazz Cabbage"),
    "journeyWeaver": a("Journey Weaver"),
    "kibbles": a("Kibbles & Beats"),
    "leftCat": a("Left Cat"),
    "livingLight": a("Living Light"),
    "lTrain": a("L-Train", [genres.bass, genres.triphop]),
    "keithMattar": a("Keith Mattar", [genres.techno]),
    "megadipites": a("Megadipites", []),
    "MykShyck": a("Myk Shyck"),
    "nateDef": a("Nate DeF"),
    "oleg": a("Oleg"),
    "omegaProtocol": a("Omega Protocol", [genres.dnb]),
    "parmaChai": a("Parma Chai"),
    "paulErlich": a("Paul Erlich"),
    "Psylander": a("Psylander"),
    "Saphire": a("Saphire", [genres.goth, genres.industrial, genres.downtempo]),
    "Sasquatch": a("Sasquatch"),
    "Scrams": a("Scrams"),
    "SmoKi": a("SmoKi"),
    "soundShaman": a("Sound Shaman"),		
    "TempoSuave": a("Tempo Suave"),
    "Ticho": a("Rob Ticho"),
    "Tigress": a("Tigress", [genres.bass, genres.world]),
    "unknown": a("(UNKNOWN)", []),			
    "vinylBlight": a("Vinyl Blight", [genres.bass]),
    "yourFurryFriend": a("Your Furry Friend"),
    // Alpha - ME:
    "SeanManton": a("Sean Manton"),
    "DimRedGlo": a("Dim Red Glo"),
    "KarNam": a("Kar'Nam"),
    "OFTHESUN": a("OFTHESUN"),
    "MikeSim": a("Mike Sim"),
    "Fractillian": a("Fractillian"),	
    "DADABOTS": a("DADABOTS"),
    "cRtxLzn": a("cRtxLzn"),
    "DrSnipples": a("Dr Snipples"),
    "djcoldcuts": a("dj cold cuts"),
    "Audiofile77": a("Audiofile77"),
    "EddyVanRaven": a("Eddy Van Raven"),
    "AWC": a("AWC"),
    "dJR": a("D:[JR]"),
    "ShwillyB": a("Shwilly B")		
};

// TODO: these all need to be async methods
export const artistService = {
    get: function () : IHash<Performer> {
        return artists;
    }
}