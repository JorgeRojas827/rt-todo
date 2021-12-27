export interface IMiembro {
    id_user: number;
    username: string;
    picture: string;
    email: string
}

export type ValidarMiembro = IMiembro[];