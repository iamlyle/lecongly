export interface IAbout {
    description: string;
    medias?: IAboutMedia[];
    hobbies?: IAboutHobby[];
}

export interface IAboutMedia {
    icon: string; // Use the official names of Brand Icons (https://www.w3schools.com/icons/fontawesome_icons_brand.asp)
    title: string;
    http: string;
}

export interface IAboutHobby {
    icon: string; // Use the official names of Brand Icons (https://www.w3schools.com/icons/fontawesome_icons_brand.asp)
    title: string;
}