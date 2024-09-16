
export type LoginFormData = {
    email: string
    password: string
}


export type Response<T> = {
    success: boolean
    message: string
    status : number
    data?: T
}

export type TUserPayload = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    dob : string;
    gender : "m" | "f" | "o";
    address : string;
    role : "super_admin" | "artist_manager" | "artist";
}

export type TPartialUserPayload = Partial<TUserPayload>;

export type TUser = {
    id: number;
    created_at: Date;
    updated_at: Date;
} & TUserPayload;


export type AxiosResponse<T> = {
    data: T
    status: number
    statusText: string
    headers: any
    config: any
    request?: any
}

export type LoginResponse = {
    accessToken: string
}